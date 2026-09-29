import React from 'react';
import { X, MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';

export interface ActivityGuide {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  topSpots: string[];
  tips: string;
  recommendedTown: string;
}

export const THINGS_TO_DO_DATA: Record<string, ActivityGuide> = {
  'top-10': {
    id: 'top-10',
    emoji: '⭐',
    title: "Top 10 Must-Do's",
    tagline: 'The unmissable quintessential South Gippsland experiences',
    description: 'From squeaking quartz beaches to panoramic granite summits and artisan sourdough, these are the signature adventures that define the Prom Coast.',
    topSpots: ['Squeaky Beach quartz stroll', 'Mount Oberon 360° summit hike', 'Tidal River wombat spotting', 'Meeniyan gourmet bakery crawl', 'Fish Creek art studio trail', 'Walkerville historic lime kilns', 'Shallow Inlet kite surfing', 'Cape Liptrap lighthouse', 'Great Southern Rail Trail cycling', 'Agnes Falls waterfall cascade'],
    tips: 'Pack layers as southern Victorian coastal weather can change swiftly. National Park entry is free for day visitors.',
    recommendedTown: 'Wilsons Promontory',
  },
  'beaches': {
    id: 'beaches',
    emoji: '🌊',
    title: 'Beaches, Swimming & Surfing',
    tagline: 'Pristine quartz sands, sheltered tidal inlets & Bass Strait point breaks',
    description: 'South Gippsland offers some of the purest, least crowded beaches in the Southern Hemisphere. Whether you want gentle protected swimming for families or exhilarating surf.',
    topSpots: ['Squeaky Beach (famous acoustic quartz sand)', 'Norman Beach (Tidal River family swimming & patrolled surf)', 'Sandy Point Surf Beach (consistent beach break waves)', 'Waratah Bay (sweeping 15km curved shoreline)', 'Whisky Bay & Picnic Bay (dramatic granite boulders)', 'Shallow Inlet (flat, glass-smooth tidal waters)'],
    tips: 'Always swim between the red and yellow flags where patrolled. Shallow Inlet is ideal for stand-up paddleboarding and wind sports.',
    recommendedTown: 'Sandy Point',
  },
  'walking': {
    id: 'walking',
    emoji: '🥾',
    title: 'Walking, Hiking & Cycling',
    tagline: 'From multi-day coastal treks to flat rail trails through dairy country',
    description: 'Lace up your boots for world-renowned coastal walks and the famous Great Southern Rail Trail that connects historic railway towns across the rolling hills.',
    topSpots: ['Mount Oberon Summit Track (3.4km return, panoramic park views)', 'Mount Bishop Summit & Lilly Pilly Gully', 'Great Southern Rail Trail (over 100km of smooth gravel trail from Nyora to Yarram)', 'Tongue Point & Fairy Cove coastal trail', 'George Bass Coastal Walk'],
    tips: 'The Great Southern Rail Trail is perfect for e-bikes, gravel bikes, and gentle family walking between café stops.',
    recommendedTown: 'Foster',
  },
  'scenic-drives': {
    id: 'scenic-drives',
    emoji: '🚗',
    title: 'Scenic Drives & Road Trips',
    tagline: 'Ribbons of tarmac winding between emerald ridges and ocean vistas',
    description: 'Experience one of Australia’s finest countryside drives, climbing from Bass Strait coastline through ancient temperate rainforests and rolling hills.',
    topSpots: ['Promontory Road (Yanakie to Tidal River wilderness drive)', 'Cape Liptrap Coastal Drive via Walkerville', 'Grand Ridge Road (ancient Strzelecki mountain ash rainforest)', 'Turtons Creek temperate fern gully drive', 'Tarwin Lower to Walkerville South scenic loop'],
    tips: 'Drive cautiously around dawn and dusk as kangaroos, wallabies, and wombats are active along the verges.',
    recommendedTown: 'Fish Creek',
  },
  'food-wine': {
    id: 'food-wine',
    emoji: '🍷',
    title: 'Food, Wine & Local Produce',
    tagline: 'Rich volcanic soils yielding artisan cheeses, cool-climate wines & ciders',
    description: 'South Gippsland is celebrated as Victoria’s gourmet larder. Meet passionate growers, artisan cheesemakers, craft brewers, and cool-climate winemakers.',
    topSpots: ['Meeniyan Pantry & Cellar (local charcuterie & Gippsland cheeses)', 'Trulli Woodfire Pizzeria (authentic Pugliese cuisine)', 'Waratah Hills Vineyard (cool-climate Pinot Noir near the Prom)', 'Gurney’s Cidery (dry heritage ciders overlooking Corner Inlet)', 'Prom Country Cheese in Moyarra', 'Fish Creek Hotel & local taprooms'],
    tips: 'Book dinner tables in Meeniyan and Fish Creek in advance on Friday and Saturday evenings during holiday periods.',
    recommendedTown: 'Meeniyan',
  },
  'wildlife': {
    id: 'wildlife',
    emoji: '🐨',
    title: 'Wildlife & Nature',
    tagline: 'Encounter wild wombats, kangaroos, emus, and migrating whales in their natural habitat',
    description: 'Wilsons Promontory is one of the most prolific wildlife viewing zones in Australia. Wombats graze freely near the river flats, while seal colonies inhabit the offshore granite islands.',
    topSpots: ['Tidal River airstrip wildlife walk (wombats & eastern grey kangaroos)', 'Five Mile Road nature viewing', 'Kanowna Island Australian Fur Seal colony (boat tours)', 'Corner Inlet Marine National Park (vital migratory bird haven)', 'Cape Liptrap whale watching vantage points (May–October)'],
    tips: 'Please never feed wild wombats or birds. Maintain a respectful distance with torches on red light mode during night walks.',
    recommendedTown: 'Wilsons Promontory',
  },
  'history': {
    id: 'history',
    emoji: '🏛️',
    title: 'History & Heritage',
    tagline: 'Indigenous Gunaikurnai and Bunurong heritage, historic lime kilns & lighthouses',
    description: 'Immerse in thousands of years of First Nations connection and pioneering maritime heritage along Australia’s southern edge.',
    topSpots: ['Walkerville Historic Lime Kilns (remnants of 19th-century coastal industry)', 'Wilsons Promontory Lightstation (built in 1859 on isolated granite cliffs)', 'Cape Liptrap Lighthouse (guiding Bass Strait vessels since 1913)', 'Foster Museum & historic gold rush township', 'Coal Creek Community Park & Museum in Korumburra'],
    tips: 'The Lime Kilns at Walkerville South are best explored during low tide.',
    recommendedTown: 'Walkerville',
  },
  'fishing': {
    id: 'fishing',
    emoji: '🎣',
    title: 'Fishing, Boating & Water Activities',
    tagline: 'King George Whiting, surf fishing, sea kayaking and eco-cruises',
    description: 'From calm inlet estuaries to world-class blue-water game fishing, South Gippsland’s waters offer unforgettable angling and boating adventures.',
    topSpots: ['Shallow Inlet (renowned for King George whiting, flathead, and trevally)', 'Port Welshpool Long Pier (fishing platform stretching nearly 1km)', 'Port Franklin scenic fishing harbour', 'Waratah Bay surf beach fishing (Australian salmon & gummy shark)', 'Wilsons Promontory amphibious boat cruises into the marine park'],
    tips: 'Always check local tide charts and purchase a Victorian Recreational Fishing Licence before casting a line.',
    recommendedTown: 'Port Welshpool',
  },
  'lookouts': {
    id: 'lookouts',
    emoji: '🌅',
    title: 'Lookouts, Sunsets & Photography',
    tagline: 'Golden hour vantage points across granite monoliths and Bass Strait horizons',
    description: 'A paradise for landscape photographers. Sunset colours reflect off quartz beaches, while elevated peaks offer 360-degree views of islands floating in turquoise seas.',
    topSpots: ['Mount Oberon Summit (Victoria’s most photographed viewpoint)', 'Cape Liptrap dramatic cliff-edge sunsets', 'Foster Lookout (sweeping panorama across Corner Inlet to the Prom)', 'Ned Neale’s Lookout at Sandy Point', 'Darby Beach sunset rocks', 'Stockyard Hill views over Shallow Inlet'],
    tips: 'Bring a tripod and torch if climbing down from Mount Oberon after watching the sunset.',
    recommendedTown: 'Sandy Point',
  },
  'family': {
    id: 'family',
    emoji: '👪',
    title: 'Family Things to Do',
    tagline: 'Gentle shallows, rock pool safaris, rail trail rides & friendly local wildlife',
    description: 'Safe, unplugged family holidays where kids can discover tidal creatures, ride safe rail trails without cars, and run freely on endless quartz sand.',
    topSpots: ['Tidal River shallow tea-tree stained river paddling', 'Norman Beach rock pools at low tide', 'Shallow Inlet calm wading and beach games', 'Foster timber adventure playground', 'Giacomo’s Italian gelato in Meeniyan', 'Coal Creek heritage railway rides in Korumburra'],
    tips: 'The calm river mouth at Tidal River has almost zero wave action, ideal for toddlers and small children.',
    recommendedTown: 'Sandy Point',
  },
  'events': {
    id: 'events',
    emoji: '📅',
    title: "Events & What's On",
    tagline: 'Seasonal festivals, farmers markets, artisan exhibitions & live acoustic music',
    description: 'Experience South Gippsland’s vibrant calendar of community events, from weekly artisan produce markets to renowned acoustic music festivals in historic halls.',
    topSpots: ['Kongwak Sunday Market (vintage, retro, vinyl & antiques)', 'Koonwarra Farmers Market (first Saturday of each month)', 'Fish Creek Tea Month & Art Exhibitions', 'Meeniyan Hall acoustic concert series (Lyrebird Arts)', 'Prom Coast Festival & regional open studio weekends'],
    tips: 'Check town blackboard notices when you arrive for pop-up weekend gigs and local farm gate openings.',
    recommendedTown: 'Koonwarra',
  },
  'arts': {
    id: 'arts',
    emoji: '🎨',
    title: 'Arts, Markets & Towns',
    tagline: 'Eccentric galleries, master bronze sculptors, independent bookshops & pottery',
    description: 'Fish Creek and surrounding hamlets have long been a sanctuary for artists, sculptors, children’s book illustrators, and ceramicists.',
    topSpots: ['Fish Creek Art Trail (Ride The Wild Goat, Gecko Gallery, Celia Rosser)', 'Stefani Hilltop Gallery', 'Archies Creek Hotel and live arts hall', 'Loch Village antiques, vintage boutiques and gin distillery', 'Foster Arts Centre & historic main street'],
    tips: 'Don’t miss taking a photo with the gigantic fiberglass fish perched atop the Fish Creek Hotel roof!',
    recommendedTown: 'Fish Creek',
  },
};

interface ThingsToDoModalProps {
  activityId: string | null;
  onClose: () => void;
  onSelectTown: (town: string) => void;
  onExploreMap: () => void;
}

export const ThingsToDoModal: React.FC<ThingsToDoModalProps> = ({
  activityId,
  onClose,
  onSelectTown,
  onExploreMap,
}) => {
  if (!activityId) return null;
  const guide = THINGS_TO_DO_DATA[activityId] || THINGS_TO_DO_DATA['top-10'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-modal-title"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <span className="text-3xl p-2 bg-stone-800 rounded-xl shrink-0" role="img" aria-label={guide.title}>
              {guide.emoji}
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prom Coast Regional Guide</span>
              </div>
              <h3 id="activity-modal-title" className="font-serif text-2xl font-bold text-white">
                {guide.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {guide.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close activity guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-stone-700 text-sm leading-relaxed">
            {guide.description}
          </p>

          {/* Top Spots */}
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900 mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-800" />
              <span>Recommended Spots & Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {guide.topSpots.map((spot, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 bg-stone-50 rounded-lg border border-stone-200 text-stone-800">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{spot}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Tip Box */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
            <span className="font-semibold text-amber-900 block mb-1">Local Explorer Tip:</span>
            {guide.tips}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Primary Base Town: <strong className="text-stone-900">{guide.recommendedTown}</strong>
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onExploreMap();
                }}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>View on Map</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onSelectTown(guide.recommendedTown);
                }}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Find Stays in {guide.recommendedTown}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
