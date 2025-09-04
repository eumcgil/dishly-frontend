'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Real supported sites from recipe-scrapers library
const supportedSites = [
  "101cookbooks.com", "15gram.be", "24kitchen.nl", "40aprons.com", "750g.com", "abeautifulmess.com",
  "aberlehome.com", "abuelascounter.com", "acouplecooks.com", "acozykitchen.com", "addapinch.com",
  "adozensundays.com", "afarmgirlsdabbles.com", "afghankitchenrecipes.com", "aflavorjournal.com",
  "ah.be", "ah.nl", "ahealthysliceoflife.com", "akispetretzikis.com", "aldi-nord.de", "aldi-sued.de",
  "aldi-suisse.ch", "aldi.com.au", "aldi.es", "aldi.fr", "aldi.hu", "aldi.it", "aldi.lu", "aldi.nl",
  "aldi.pl", "aldi.pt", "alexandracooks.com", "alittlebityummy.com", "allrecipes.com",
  "allthehealthythings.com", "alltommat.se", "altonbrown.com", "amazingoriental.com", "amazingribs.com",
  "ambitiouskitchen.com", "ameessavorydish.com", "americastestkitchen.com", "app.samsungfood.com",
  "archanaskitchen.com", "argiro.gr", "arla.se", "atelierdeschefs.fr", "averiecooks.com",
  "bakels.co.uk", "bakels.com.au", "bakerbynature.com", "bakewithzoha.com", "baking-sense.com",
  "bakingmischief.com", "barefeetinthekitchen.com", "barefootcontessa.com", "barefootinthepines.com",
  "bbc.co.uk", "bbc.com", "bbcgoodfood.com", "bestrecipes.com.au", "betterfoodguru.com",
  "bettybossi.ch", "bettycrocker.com", "beyondfrosting.com", "biancazapatka.com", "bigoven.com",
  "bitsofcarey.com", "blueapron.com", "bluejeanchef.com", "bodybuilding.com", "bofrost.de",
  "bonappetit.com", "bongeats.com", "books.ottolenghi.co.uk", "bowlofdelicious.com", "breadtopia.com",
  "briceletbaklava.ch", "brokenovenbaking.com", "budgetbytes.com", "cafedelites.com",
  "cakemehometonight.com", "cambreabakes.com", "carlsbadcravings.com", "castironketo.net",
  "cdkitchen.com", "celebratingsweets.com", "chefjackovens.com", "chefjeanpierre.com", "chefkoch.de",
  "chefnini.com", "chefsavvy.com", "chewoutloud.com", "claudia.abril.com.br", "closetcooking.com",
  "colleenchristensennutrition.com", "comidinhasdochef.com", "cook-talk.com", "cookieandkate.com",
  "cookiesandcups.com", "cooking.nytimes.com", "cookingcircle.com", "cookinglight.com",
  "cookinglsl.com", "cookingwithjanica.com", "cookomix.com", "cookpad.com", "cookscountry.com",
  "cooksillustrated.com", "cookwell.com", "copykat.com", "corriecooks.com", "costco.com",
  "countryliving.com", "creativecanning.com", "cucchiaio.it", "cuisineaz.com", "cuisinez-pour-bebe.fr",
  "culy.nl", "cybercook.com.br", "dagelijksekost.vrt.be", "damndelicious.net", "davidlebovitz.com",
  "delish.com", "dinneratthezoo.com", "dinnerthendessert.com", "dish.co.nz", "dobruchut.aktuality.sk",
  "domesticate-me.com", "donalskehan.com", "downshiftology.com", "dr.dk", "drizzleanddip.com",
  "eatingbirdfood.com", "eatingwell.com", "eatliverun.com", "eatsmarter.com", "eatsmarter.de",
  "eatthismuch.com", "eattolerant.de", "eatwell101.com", "eatwhattonight.com", "editions-larousse.fr",
  "eggs.ca", "elavegan.com", "emmikochteinfach.de", "en.wikibooks.org", "epicurious.com",
  "erinliveswhole.com", "errenskitchen.com", "ethanchlebowski.com", "everydaypie.com",
  "evolvingtable.com", "familyfoodonthetable.com", "farmhouseonboone.com", "fattoincasadabenedetta.it",
  "feastingathome.com", "felix.kitchen", "festligare.se", "fifteenspatulas.com", "finedininglovers.com",
  "fitmencook.com", "fitslowcookerqueen.com", "food.com", "food52.com", "foodandwine.com",
  "foodfidelity.com", "foodnetwork.co.uk", "foodnetwork.com", "foodrepublic.com", "forksoverknives.com",
  "forktospoon.com", "franzoesischkochen.de", "garnishandglaze.com", "gesund-aktiv.com",
  "gimmesomeoven.com", "glutenfreeonashoestring.com", "godt.no", "gonnawantseconds.com",
  "goodfooddiscoveries.com", "goodhousekeeping.com", "gourmettraveller.com.au", "grandfrais.com",
  "greatbritishchefs.com", "grimgrains.com", "grouprecipes.com", "halfbakedharvest.com",
  "handletheheat.com", "hassanchef.com", "headbangerskitchen.com", "healthyeating.nhlbi.nih.gov",
  "healthywithachanceofsprinkles.com", "heatherchristo.com", "heb.com", "hellofresh.at",
  "hellofresh.be", "hellofresh.ca", "hellofresh.ch", "hellofresh.co.nz", "hellofresh.co.uk",
  "hellofresh.com", "hellofresh.com.au", "hellofresh.de", "hellofresh.dk", "hellofresh.es",
  "hellofresh.fr", "hellofresh.ie", "hellofresh.it", "hellofresh.lu", "hellofresh.nl",
  "hellofresh.no", "hellofresh.se", "hersheyland.com", "hilahcooking.com", "hofer.at", "hofer.si",
  "homeandplate.com", "homechef.com", "hostthetoast.com", "howtofeedaloon.com", "hungryhappens.net",
  "ica.se", "im-worthy.com", "inbloombakery.com", "indianhealthyrecipes.com", "ingoodflavor.com",
  "innit.com", "insanelygoodrecipes.com", "inspiralized.com", "inspiredtaste.net", "iowagirleats.com",
  "irishcentral.com", "izzycooking.com", "jamieoliver.com", "jimcooksfoodgood.com", "jocooks.com",
  "joshuaweissman.com", "joyfoodsunshine.com", "joythebaker.com", "juliegoodwin.com.au", "jumbo.com",
  "justalittlebitofbacon.com", "justataste.com", "justbento.com", "justinesnacks.com",
  "justonecookbook.com", "kalejunkie.com", "kellyscleankitchen.com", "kennymcgovern.com",
  "keukenliefde.nl", "kiddokitchen.se", "kikkoman.eu", "kingarthurbaking.com", "kitchenaid.com.au",
  "kitchendivas.com", "kitchendreaming.com", "kitchensanctuary.com", "kitchenstories.com",
  "kochbar.de", "kochbucher.com", "koket.se", "kookjij.nl", "kristineskitchenblog.com",
  "krollskorner.com", "kuchnia-domowa.pl", "kuchynalidla.sk", "kwestiasmaku.com",
  "lacucinaitaliana.com", "lacucinaitaliana.it", "lanascooking.com", "latelierderoxane.com",
  "leanandgreenrecipes.net", "lecker.de", "leckerschmecker.me", "lecremedelacrumb.com",
  "leitesculinaria.com", "lekkerensimpel.com", "leukerecepten.nl", "lifestyleofafoodie.com",
  "littlespicejar.com", "littlesunnykitchen.com", "livelytable.com", "loveandlemons.com",
  "lovingitvegan.com", "maangchi.com", "madamecuisine.de", "madensverden.dk", "madsvin.com",
  "makeitdairyfree.com", "marmiton.org", "marthastewart.com", "matprat.no", "mccormick.com",
  "mealprepmanual.com", "meganvskitchen.com", "meljoulwan.com", "melskitchencafe.com",
  "migusto.migros.ch", "miljuschka.nl", "mindmegette.hu", "minimalistbaker.com", "ministryofcurry.com",
  "misya.info", "mob.co.uk", "mobkitchen.co.uk", "modernhoney.com", "momontimeout.com",
  "momswithcrockpots.com", "motherthyme.com", "moulinex.fr", "mundodereceitasbimby.com.pt",
  "mybakingaddiction.com", "myjewishlearning.com", "mykitchen101.com", "mykitchen101en.com",
  "mykoreankitchen.com", "myplate.gov", "myrecipes.com", "myvegetarianroots.com",
  "natashaskitchen.com", "naturallyella.com", "ndr.de", "netacooks.com", "nhs.uk",
  "nibbledish.com", "ninjatestkitchen.com", "noracooks.com", "norecipes.com", "nosalty.hu",
  "notenoughcinnamon.com", "nourishedbynutrition.com", "nrk.no", "number-2-pencil.com",
  "nutritionbynathalie.com", "nutritionfacts.org", "ohsheglows.com", "okokorecepten.nl",
  "omnivorescookbook.com", "onceuponachef.com", "onesweetappetite.com", "organicallyaddison.com",
  "owen-han.com", "paleorunningmomma.com", "panelinha.com.br", "paninihappy.com",
  "panlasangpinoy.com", "peelwithzeal.com", "persnicketyplates.com", "pickuplimes.com",
  "picnic.app", "pilipinasrecipes.com", "pinchofyum.com", "pingodoce.pt", "pinkowlkitchen.com",
  "platingpixels.com", "plowingthroughlife.com", "poppycooks.com", "popsugar.com", "potatorolls.com",
  "practicalselfreliance.com", "preppykitchen.com", "pressureluckcooking.com", "primaledgehealth.com",
  "projectgezond.nl", "przepisy.pl", "purelypope.com", "purplecarrot.com", "quakeroats.com",
  "quitoque.fr", "rachlmansfield.com", "rainbowplantlife.com", "realfood.tesco.com",
  "realfoodwell.com", "realsimple.com", "receitas.globo.com", "receitas.ig.com.br",
  "receitasnestle.com.br", "recept.se", "receptyprevas.sk", "recette.plus", "recipegirl.com",
  "recipeland.com", "reciperunner.com", "recipes.farmhousedelivery.com", "recipes.timesofindia.com",
  "recipetineats.com", "redhousespice.com", "reishunger.de", "rewe.de", "rezeptwelt.de",
  "ricetta.it", "ricette.giallozafferano.it", "ricetteperbimby.it", "rosannapansino.com",
  "rutgerbakt.nl", "saboresajinomoto.com.br", "sallys-blog.de", "sallysbakingaddiction.com",
  "saltpepperskillet.com", "sandwichtribunal.com", "saveur.com", "savorynothings.com",
  "schoolofwok.co.uk", "scrummylane.com", "seriouseats.com", "shelikesfood.com",
  "simple-veganista.com", "simplegreensmoothies.com", "simply-cookit.com", "simplyquinoa.com",
  "simplyrecipes.com", "simplywhisked.com", "sipandfeast.com", "sizzlefish.com", "skinnytaste.com",
  "smulweb.nl", "sobors.hu", "southerncastiron.com", "southernliving.com", "spainonafork.com",
  "spendwithpennies.com", "spisbedre.dk", "springlane.de", "stacyling.com", "staysnatched.com",
  "steamykitchen.com", "streetkitchen.hu", "strongrfastr.com", "sudachirecipes.com", "sugarhero.com",
  "sunbasket.com", "sundpaabudget.dk", "sunset.com", "sweetcsdesigns.com", "sweetpeasandsaffron.com",
  "swissmilk.ch", "tableanddish.com", "taste.com.au", "tasteatlas.com", "tasteofhome.com",
  "tastesbetterfromscratch.com", "tastesoflizzyt.com", "tastinghistory.com", "tasty.co",
  "tastykitchen.com", "tastyoven.com", "tatyanaseverydayfood.com", "thebigmansworld.com",
  "theclevercarrot.com", "thecookierookie.com", "thecookingguy.com", "thefirstmess.com",
  "thefoodietakesflight.com", "theglutenfreeaustrian.com", "thehappyfoodie.co.uk",
  "thekitchencommunity.org", "thekitchenmagpie.com", "thekitchn.com", "theloopywhisk.com",
  "themagicalslowcooker.com", "themediterraneandish.com", "themodernproper.com",
  "theoldwomanandthesea.com", "thepalatablelife.com", "thepioneerwoman.com", "theplantbasedschool.com",
  "therecipecritic.com", "thesaltymarshmallow.com", "thespicetrain.com", "thespruceeats.com",
  "thevintagemixer.com", "thewoksoflife.com", "thinlicious.com", "thishealthytable.com",
  "tidymom.net", "tine.no", "tofoo.co.uk", "toriavey.com", "tudogostoso.com.br",
  "twopeasandtheirpod.com", "uitpaulineskeuken.nl", "unsophisticook.com", "usapears.org",
  "valdemarsro.dk", "vanillaandbean.com", "varecha.pravda.sk", "vegetarbloggen.no", "vegolosi.it",
  "vegrecipesofindia.com", "veroniquecloutier.com", "waitrose.com", "watchwhatueat.com",
  "wearenotmartha.com", "wedishitup.com", "weightwatchers.com", "wellplated.com",
  "whatsgabycooking.com", "whole30.com", "wholefoodsmarket.co.uk", "wholefoodsmarket.com",
  "williams-sonoma.com", "womensweeklyfood.com.au", "woop.co.nz", "www1.wdr.de", "xiachufang.com",
  "yemek.com", "yummly.com", "zaubertopf.de", "zeit.de", "zenbelly.com", "zestfulkitchen.com"
];

// Helper functions for search (moved outside component to avoid hoisting issues)
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};

export default function SupportedSitesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSites = useMemo(() => {
    if (!searchTerm.trim()) return supportedSites;
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    return supportedSites.filter(site => {
      const siteLower = site.toLowerCase();
      
      // Exact match
      if (siteLower === searchLower) return true;
      
      // Contains search term
      if (siteLower.includes(searchLower)) return true;
      
      // Check without domain extension
      const siteWithoutTld = siteLower.replace(/\.(com|org|net|co\.uk|co\.au|de|fr|it|se|no|dk|nl|be|ch|gr|hu|sk|pl|br)$/, '');
      if (siteWithoutTld.includes(searchLower)) return true;
      
      // Check individual words (for multi-word searches)
      const searchWords = searchLower.split(/\s+/);
      if (searchWords.length > 1) {
        return searchWords.every(word => siteLower.includes(word));
      }
      
      // Fuzzy matching for common typos
      if (searchLower.length > 3) {
        const similarity = calculateSimilarity(siteLower, searchLower);
        return similarity > 0.6;
      }
      
      return false;
    }).sort((a, b) => {
      // Sort by relevance: exact matches first, then by similarity
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      
      if (aLower.startsWith(searchLower) && !bLower.startsWith(searchLower)) return -1;
      if (!aLower.startsWith(searchLower) && bLower.startsWith(searchLower)) return 1;
      
      return a.localeCompare(b);
    });
  }, [searchTerm]);

  const handleSiteClick = (site: string) => {
    window.open(`https://${site}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">Supported Recipe Websites</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Dishly.pro supports over <strong>{supportedSites.length}</strong> recipe websites. 
            Find your favorite cooking sites below.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Popular Sites */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              Popular Recipe Sites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                "allrecipes.com", "food.com", "bbcgoodfood.com", "foodnetwork.com",
                "bonappetit.com", "seriouseats.com", "tasteofhome.com", "simplyrecipes.com"
              ].map((site) => (
                <Button
                  key={site}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => handleSiteClick(site)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{site}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Supported Sites */}
        <Card>
          <CardHeader>
            <CardTitle>
              All Supported Sites 
              {searchTerm && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ({filteredSites.length} results)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No results found for "{searchTerm}"</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  className="mt-4"
                >
                  Clear search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {filteredSites.map((site, index) => (
                  <motion.div
                    key={site}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.01, duration: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      className="justify-start h-auto p-2 text-left w-full hover:bg-muted/50"
                      onClick={() => handleSiteClick(site)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="truncate text-sm">{site}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-50" />
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Don't see your favorite recipe site? Some websites may have unique formats that aren't compatible 
            with our parser. The recipe-scrapers library is constantly being updated with new site support.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
