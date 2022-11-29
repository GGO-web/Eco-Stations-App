export const waste = {
  types: [
    {
      id: 'plastics',
      name: 'PLASTICS',
      image: './CardPics/plastics.jpg',
      specificTypes: [
        {
          shortcut: 'PET',
          fullName: 'Polyethylene terephthalate / PET / PETF / PET / PETE',
          disposed: [
            'The bottle is transparent from under drinks without color',
            'The bottle is transparent from under drinks, blue',
            'The transparent drink bottle is green',
            'The bottle is transparent from under drinks, brown',
            'The bottle is transparent from under drinks yellow',
            'The drink bottle is black',
            'The bottles are white and transparent from under the milk',
            'A bottle from under the oil',
            'A bottle of vinegar and soy sauce, only if the label is easily removed (put in the bag with oil bottles)',
            'Transparent and colored bottles from household chemicals (lids, caps, dispensers and stickers can be left)',
          ],
          importantly: [
            'Remove caps from all bottles except oil and household chemicals.',
            'Remove labels from all bottles (except paper labels).',
            'Shrink bottles to take up less space.',
            'Please contact a specialized organization for disposal of materials that are not in the list',
          ],
        },
        {
          shortcut: 'HDPE',
          fullName: 'High-density polyethylene / low-pressure polyethylene / PE-HD',
          disposed: [
            'Bottles and vials from household chemicals',
            'Bottles and vials from dairy products',
            'Lids from bottles with drinks',
          ],
          importantly: [
            'Remove caps, labels and stickers',
            'Shrink bottles to take up less space',
            'Please contact a specialized organization for disposal of materials that are not in the list',
          ],
        },
        {
          shortcut: 'PVC',
          fullName: 'Polyvinyl chloride / PVC',
          notDisposed: ['Any PVC products. This material contains chlorine. When heated, it emits highly toxic compounds, so its processing and burning are dangerous for the environment. Please avoid using such packaging if possible. Please contact a specialized organization for disposal of these materials'],
        },
        {
          shortcut: 'LDPE',
          fullName: 'Low density polyethylene / high pressure polyethylene / PE-LD',
          disposed: [
            'Commercial films (stretch film, "bumpy", zip-bags without a lock-runner, packaging from personal hygiene products: toilet paper, diapers, etc.)',
            'Polyethylene bags ("balls") of all sizes and colors',
            'Dairy, postal and soil bags (black inside)',
            'Lids from water bottles (without polystyrene foam ring and sticker)',
          ],
          importantly: [
            'Remove caps, labels and stickers',
            'Please contact a specialized organization for disposal of materials that are not in the list',
          ],
        },
        {
          shortcut: 'PS',
          fullName: 'Polystyrene / PS',
          disposed: [
            'White foam (the one that crumbles into balls), colored or with colored splashes',
            'White and colored polystyrene foam packaging',
            'Children\'s toys from expanded polystyrene',
            'Boxes from CDs and cassettes',
          ],
          importantly: [
            'Please contact a specialized organization for disposal of materials that are not in the list',
          ],
        },
        {
          shortcut: 'PC',
          fullName: 'Polycarbonate',
          disposed: [
            'Bottles from under water',
            'CD',
            'Other polycarbonate products',
          ],
          importantly: [
            'Please contact a specialized organization for disposal of materials that are not in the list',
          ],
        },
      ],
    },
    {
      id: 'paper',
      name: 'PAPER',
      image: './CardPics/paper.webp',
      specificTypes: [
        {
          shortcut: 'PAP',
          disposed: [
            'Corrugated cardboard',
            'Papier-mâché (egg trays, packaging for takeaway drinks)',
            'Paper mix (newspapers, books, office white paper and all other paper products)',
          ],
          importantly: [
            'Remove the stickers and tape',
            'Fold packages so that they take up less space',
            'UBS is not responsible for the personal data indicated on the paper submitted for recycling',
            'Please contact a specialized organization for disposal of materials that are not in the list',
          ],
        },
      ],
    },
    {
      id: 'metal',
      name: 'METAL',
      image: './CardPics/metal.jpg',
      specificTypes: [
        {
          shortcut: 'FE, ALU ETC',
          disposed: [
            'Tin cans for food and paint products, as well as lids',
            'Aluminum cans from cans and drinks',
            'Aluminum tubes and lids',
            'Foil and foil packaging',
            'Household metal (pots, pans, nails, etc.). The share of plastic in household metal should not exceed 10%',
            'Empty cassettes for photo films',
            'Aerosol cans (only empty and without caps and plastic sprayers!)',
          ],
          importantly: [
            'To distinguish tin from aluminum, check them with a magnet attached to the container',
            'Tin is magnetized, aluminum is not',
            'Please contact a specialized organization for disposal of materials that are not in the list',
          ],
        },
      ],
    },
    {
      id: 'glass',
      name: 'GLASS',
      image: './CardPics/glass.jpg',
      specificTypes: [
        {
          shortcut: 'GL',
          disposed: [
            'Colored glass and colored broken glass',
            'Transparent glass without tints and transparent broken glass',
            'Sheet glass',
          ],
          notDisposed: ['Light bulbs', 'Thermometers', 'Painted glass', 'Ceramics', 'Mirrors', 'Thermal glass, tempered glass', 'Protective glass for gadgets', 'Crystal', 'Lenses', 'Ampoules'],
          importantly: [
            'Remove the lids from all the glass, except for the oil bottles.',
            'Be sure to pack sharp parts of glassware in cardboard and, if necessary, wrap with stretch film',
            'Please contact a specialized organization for disposal of these materials',
          ],
        },
      ],
    },
    {
      id: 'e-waste',
      name: 'Electronic waste',
      image: './CardPics/e-waste.jpg',
      specificTypes: [
        {
          shortcut: 'E-waste',
          description: 'E-waste is extremely hazardous to human health and the environment. This type of waste cannot be disposed of in the usual way. You should contact a specialized organization for the disposal of e-waste, such as:',
          disposed: [
            'Refrigerators',
            'TVs',
            'computer monitors, keyboards and mice',
            'microwave ovens',
            'washing machines',
            'electric kettles',
            'uninterruptible power supplies (UPS)',
            'water heaters',
            'vacuum cleaners',
            'printers',
            'fax machines',
          ],
        },
      ],
    },
    {
      id: 'not-disposed',
      name: 'Can NOT be disposed',
      image: './CardPics/not-disposed.jpg',
      specificTypes: [
        {
          shortcut: 'NT DIS',
          notDisposed: [
            'Pharmaceutical and medical waste (used masks, gloves, expired medicines, ampoules)',
            'Batteries, accumulators, mercury-containing (fluorescent) lamps and thermometers',
            'Waste that came into contact with body fluids (blood, urine, saliva, secretions)',
            'Used personal hygiene products (diapers, pads, tampons, etc.)',
            'Printer cartridges',
            'Gas cylinders',
            'Ceramics',
            'Sharp and cutting objects (needles, blades)',
            'Construction waste, varnishes, paints, plasticine',
            'Butts and sticks for smoking',
            'Lighters',
            'Explosive objects',
          ],
          importantly: [
            'The specified waste must be disposed of by specialized organizations',
          ],
        },
      ],
    },
  ],
};
