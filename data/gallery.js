/**
 * K&J Caribbean — Gallery Data
 *
 * HOW TO ADD IMAGES:
 *  1. Drop your photo into images/market/ (JPG, PNG, WebP, or MP4/WebM for video)
 *  2. Add an entry below in the `market` array
 *  3. Run: node scripts/build.js
 *  4. Run: git add images/market/yourfile.jpg data/gallery.js && git commit -m "add market photo" && git push
 *  → Live within ~60 seconds
 *
 * HOW TO ADD VIDEO:
 *  Set type: "video", provide a thumbnail image, and point file at .mp4 or .webm
 *
 * HOW TO REORDER:
 *  Just drag entries up/down in this array — gallery displays in order.
 *
 * HOW TO REMOVE:
 *  Delete the entry from the array below and optionally delete the file.
 */

window.GALLERY_DATA = {

  market: [
    {
      type:    "image",
      file:    "images/market/market-01.jpg",
      alt:     "Beverages aisle — wide selection of tropical drinks",
      caption: "🥤 Huge drinks selection — Foco, AriZona, Jumex, Canada Dry & more",
      featured: false
    },
    {
      type:    "image",
      file:    "images/market/market-02.jpg",
      alt:     "Dry goods aisle — cereals, noodles, and pantry staples",
      caption: "🌾 Cereals, noodles, and pantry essentials — Bongú, Hyde Park & more",
      featured: false
    },
    {
      type:    "image",
      file:    "images/market/market-03.jpg",
      alt:     "Full market aisle view — drinks, canned goods, and condiments",
      caption: "🛒 Fully stocked aisles — canned goods, sauces, condiments & drinks",
      featured: true
    },
    {
      type:    "image",
      file:    "images/market/market-04.jpg",
      alt:     "Beverages aisle — tropical drinks and Caribbean sodas",
      caption: "🥥 Tropical juices, coconut drinks, Jarrito, Gatorade & more",
      featured: false
    },
    {
      type:    "image",
      file:    "images/market/market-05.jpg",
      alt:     "Market aisle — snacks, drinks, and Caribbean imports",
      caption: "🍹 Caribbean imports, AriZona teas, and specialty beverages",
      featured: false
    },
    {
      type:    "image",
      file:    "images/market/market-06.jpg",
      alt:     "Market shelves — canned goods, peanut butter, and pantry staples",
      caption: "🥜 Carnation, peanut butter, preserves, and Caribbean pantry staples",
      featured: false
    },
    {
      type:    "image",
      file:    "images/market/market-07.jpg",
      alt:     "Beverages and snacks aisle with wide variety",
      caption: "🧃 Sparkling water, Nestle, Mistic, bodyarmor & tropical juices",
      featured: false
    },
    {
      type:    "image",
      file:    "images/market/market-08.jpg",
      alt:     "Market panorama — multiple aisles of Caribbean and international goods",
      caption: "🌴 Your one-stop Caribbean market — everything you need from the islands",
      featured: false
    }
  ]

  /*
   * ── FUTURE SECTIONS (uncomment & populate when ready) ──
   *
   * restaurant: [
   *   { type: "image", file: "images/restaurant/food-01.jpg", alt: "...", caption: "..." }
   * ],
   *
   * catering: [
   *   { type: "image", file: "images/catering/event-01.jpg", alt: "...", caption: "..." }
   * ]
   */
};
