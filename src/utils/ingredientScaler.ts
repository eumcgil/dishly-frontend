// Utility functions for scaling recipe ingredients based on serving size

export interface ParsedIngredient {
  original: string;
  quantity: number | null;
  unit: string | null;
  ingredient: string;
  isRange: boolean;
  rangeEnd?: number;
}

// Common cooking units and their variations
const UNITS = [
  // Volume
  'cup', 'cups', 'c',
  'tablespoon', 'tablespoons', 'tbsp', 'tbs', 'tb',
  'teaspoon', 'teaspoons', 'tsp', 'ts',
  'fluid ounce', 'fluid ounces', 'fl oz', 'floz',
  'pint', 'pints', 'pt',
  'quart', 'quarts', 'qt',
  'gallon', 'gallons', 'gal',
  'liter', 'liters', 'litre', 'litres', 'l',
  'milliliter', 'milliliters', 'millilitre', 'millilitres', 'ml',
  
  // Weight
  'pound', 'pounds', 'lb', 'lbs',
  'ounce', 'ounces', 'oz',
  'gram', 'grams', 'g',
  'kilogram', 'kilograms', 'kg',
  
  // Other common units
  'inch', 'inches', 'in',
  'piece', 'pieces', 'pc',
  'slice', 'slices',
  'clove', 'cloves',
  'can', 'cans',
  'jar', 'jars',
  'bottle', 'bottles',
  'package', 'packages', 'pkg',
  'box', 'boxes',
  'bag', 'bags',
];

// Convert fractions to decimals
const FRACTIONS: { [key: string]: number } = {
  '1/8': 0.125,
  '1/4': 0.25,
  '1/3': 0.333,
  '3/8': 0.375,
  '1/2': 0.5,
  '5/8': 0.625,
  '2/3': 0.667,
  '3/4': 0.75,
  '7/8': 0.875,
  '1/16': 0.0625,
  '3/16': 0.1875,
  '5/16': 0.3125,
  '7/16': 0.4375,
  '9/16': 0.5625,
  '11/16': 0.6875,
  '13/16': 0.8125,
  '15/16': 0.9375,
};

function parseFraction(fractionStr: string): number {
  if (FRACTIONS[fractionStr]) {
    return FRACTIONS[fractionStr];
  }
  
  // Handle mixed numbers like "1 1/2"
  const mixedMatch = fractionStr.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1]);
    const numerator = parseInt(mixedMatch[2]);
    const denominator = parseInt(mixedMatch[3]);
    return whole + (numerator / denominator);
  }
  
  // Handle simple fractions like "3/4"
  const fractionMatch = fractionStr.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1]);
    const denominator = parseInt(fractionMatch[2]);
    return numerator / denominator;
  }
  
  return parseFloat(fractionStr) || 0;
}

function formatQuantity(quantity: number): string {
  // Convert decimals back to fractions when appropriate
  const tolerance = 0.01;
  
  for (const [fraction, decimal] of Object.entries(FRACTIONS)) {
    if (Math.abs(quantity - decimal) < tolerance) {
      return fraction;
    }
  }
  
  // Check for mixed numbers
  if (quantity > 1) {
    const whole = Math.floor(quantity);
    const decimal = quantity - whole;
    
    for (const [fraction, fractionDecimal] of Object.entries(FRACTIONS)) {
      if (Math.abs(decimal - fractionDecimal) < tolerance) {
        return `${whole} ${fraction}`;
      }
    }
  }
  
  // Round to reasonable precision
  if (quantity < 0.1) {
    return quantity.toFixed(3).replace(/\.?0+$/, '');
  } else if (quantity < 1) {
    return quantity.toFixed(2).replace(/\.?0+$/, '');
  } else if (quantity < 10) {
    return quantity.toFixed(1).replace(/\.?0+$/, '');
  } else {
    return Math.round(quantity).toString();
  }
}

export function parseIngredient(ingredient: string): ParsedIngredient {
  const original = ingredient.trim();
  let remaining = original.toLowerCase();
  
  // Handle ranges like "2-3 cups" or "1 to 2 tablespoons"
  const rangeMatch = remaining.match(/^(\d+(?:\s+\d+\/\d+|\.\d+|\/\d+)?)\s*[-–to]\s*(\d+(?:\s+\d+\/\d+|\.\d+|\/\d+)?)/);
  if (rangeMatch) {
    const startQty = parseFraction(rangeMatch[1]);
    const endQty = parseFraction(rangeMatch[2]);
    
    // Remove the range from the string to find unit and ingredient
    remaining = remaining.replace(rangeMatch[0], '').trim();
    
    // Find the unit
    let unit: string | null = null;
    for (const u of UNITS) {
      if (remaining.startsWith(u)) {
        unit = u;
        remaining = remaining.substring(u.length).trim();
        break;
      }
    }
    
    return {
      original,
      quantity: startQty,
      rangeEnd: endQty,
      isRange: true,
      unit,
      ingredient: remaining || original
    };
  }
  
  // Handle single quantities with fractions, decimals, or mixed numbers
  const quantityMatch = remaining.match(/^(\d+(?:\s+\d+\/\d+|\.\d+|\/\d+)?)/);
  if (quantityMatch) {
    const quantity = parseFraction(quantityMatch[1]);
    remaining = remaining.substring(quantityMatch[0].length).trim();
    
    // Find the unit
    let unit: string | null = null;
    for (const u of UNITS) {
      if (remaining.startsWith(u)) {
        unit = u;
        remaining = remaining.substring(u.length).trim();
        break;
      }
    }
    
    return {
      original,
      quantity,
      unit,
      ingredient: remaining || original,
      isRange: false
    };
  }
  
  // No quantity found - return as-is (like "Salt to taste")
  return {
    original,
    quantity: null,
    unit: null,
    ingredient: original,
    isRange: false
  };
}

export function scaleIngredient(parsed: ParsedIngredient, multiplier: number): string {
  if (parsed.quantity === null) {
    // No quantity to scale (like "Salt to taste")
    return parsed.original;
  }
  
  if (parsed.isRange && parsed.rangeEnd) {
    // Scale both ends of the range
    const scaledStart = parsed.quantity * multiplier;
    const scaledEnd = parsed.rangeEnd * multiplier;
    
    const startStr = formatQuantity(scaledStart);
    const endStr = formatQuantity(scaledEnd);
    
    let result = `${startStr}-${endStr}`;
    if (parsed.unit) {
      result += ` ${parsed.unit}`;
    }
    if (parsed.ingredient) {
      result += ` ${parsed.ingredient}`;
    }
    
    return result;
  } else {
    // Scale single quantity
    const scaledQuantity = parsed.quantity * multiplier;
    const quantityStr = formatQuantity(scaledQuantity);
    
    let result = quantityStr;
    if (parsed.unit) {
      result += ` ${parsed.unit}`;
    }
    if (parsed.ingredient) {
      result += ` ${parsed.ingredient}`;
    }
    
    return result;
  }
}

function cleanIngredientText(ingredient: string): string {
  let cleaned = ingredient.trim();
  
  // Remove excessive double parentheses like ((Note 1)) -> (Note 1)
  cleaned = cleaned.replace(/\(\(([^)]+)\)\)/g, '($1)');
  
  // Remove empty parentheses
  cleaned = cleaned.replace(/\(\s*\)/g, '');
  
  // Clean up notes in parentheses that are just duplicating info
  // e.g., "all-purpose flour" -> remove "(all-purpose flour)"
  cleaned = cleaned.replace(/\s*\(\s*([^)]*)\s*\)/g, (match, content) => {
    const mainText = cleaned.replace(match, '').trim().toLowerCase();
    const noteText = content.toLowerCase().trim();
    
    // If the parenthetical content is just a duplicate or very similar, remove it
    if (mainText.includes(noteText) || noteText.includes(mainText.split(' ')[0])) {
      return '';
    }
    
    // Keep useful notes but clean them up
    if (content.toLowerCase().includes('note') || 
        content.toLowerCase().includes('optional') || 
        content.toLowerCase().includes('see') ||
        content.match(/^\d+$/)) {
      return ` (${content.trim()})`;
    }
    
    return ` (${content.trim()})`;
  });
  
  // Remove excessive spaces and commas
  cleaned = cleaned.replace(/\s*,\s*,/g, ','); // double commas
  cleaned = cleaned.replace(/,\s*$/, ''); // trailing comma
  cleaned = cleaned.replace(/\s+/g, ' '); // multiple spaces
  
  // Clean up common messy patterns
  cleaned = cleaned.replace(/\s*,\s*real not artificially flavoured/g, '');
  cleaned = cleaned.replace(/\s*\/\s*kosher salt/, ' or kosher salt');
  cleaned = cleaned.replace(/cooking salt \/ kosher salt/, 'salt');
  
  return cleaned.trim();
}

export function scaleIngredients(ingredients: string[], originalServings: number, newServings: number): string[] {
  if (originalServings <= 0 || newServings <= 0) {
    return ingredients.map(cleanIngredientText);
  }
  
  const multiplier = newServings / originalServings;
  
  return ingredients.map(ingredient => {
    const cleaned = cleanIngredientText(ingredient);
    const parsed = parseIngredient(cleaned);
    return scaleIngredient(parsed, multiplier);
  });
}
