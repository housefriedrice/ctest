export const CATEGORIES = [
  'Power Tools',
  'Bearings & Seals',
  'Electric Motors',
  'Safety Equipment',
  'Fasteners & Hardware',
  'Lubricants & Chemicals',
  'Pneumatics & Hydraulics',
  'Material Handling',
  'Packaging Materials',
  'Facility Maintenance',
]

export const CATEGORY_COLORS = {
  'Power Tools':            '#F59E0B',
  'Bearings & Seals':       '#6366F1',
  'Electric Motors':        '#0EA5E9',
  'Safety Equipment':       '#22C55E',
  'Fasteners & Hardware':   '#64748B',
  'Lubricants & Chemicals': '#EC4899',
  'Pneumatics & Hydraulics':'#14B8A6',
  'Material Handling':      '#F97316',
  'Packaging Materials':    '#8B5CF6',
  'Facility Maintenance':   '#84CC16',
}

export const SUPPLIERS = [
  { name: 'Grainger',          code: 'GRR', rating: 4.8, categories: ['Power Tools','Safety Equipment','Bearings & Seals','Electric Motors','Pneumatics & Hydraulics','Facility Maintenance'], skus: 18, contact: 'orders@grainger.com', phone: '1-800-472-4643' },
  { name: 'Fastenal',          code: 'FST', rating: 4.6, categories: ['Fasteners & Hardware','Power Tools','Safety Equipment'], skus: 9, contact: 'orders@fastenal.com', phone: '1-877-327-8362' },
  { name: 'Applied Industrial',code: 'AIT', rating: 4.7, categories: ['Bearings & Seals','Electric Motors','Lubricants & Chemicals','Pneumatics & Hydraulics','Facility Maintenance'], skus: 12, contact: 'orders@applied.com', phone: '1-888-259-2449' },
  { name: 'MSC Direct',        code: 'MSC', rating: 4.5, categories: ['Fasteners & Hardware','Power Tools','Bearings & Seals'], skus: 7, contact: 'orders@mscdirect.com', phone: '1-800-645-7270' },
  { name: 'Fisher Scientific', code: 'FSH', rating: 4.4, categories: ['Lubricants & Chemicals','Safety Equipment','Facility Maintenance'], skus: 6, contact: 'orders@fishersci.com', phone: '1-800-766-7000' },
  { name: 'Uline',             code: 'ULN', rating: 4.7, categories: ['Packaging Materials','Material Handling','Facility Maintenance'], skus: 10, contact: 'orders@uline.com', phone: '1-800-295-5510' },
  { name: 'Graybar',           code: 'GRB', rating: 4.5, categories: ['Electric Motors','Facility Maintenance'], skus: 4, contact: 'orders@graybar.com', phone: '1-800-472-9227' },
  { name: 'Imperial Supplies', code: 'IMP', rating: 4.3, categories: ['Fasteners & Hardware','Safety Equipment','Lubricants & Chemicals'], skus: 5, contact: 'orders@imperialsupplies.com', phone: '1-800-558-2808' },
  { name: 'Staples Business',  code: 'STP', rating: 4.2, categories: ['Packaging Materials','Safety Equipment','Facility Maintenance'], skus: 6, contact: 'orders@staples.com', phone: '1-800-378-2753' },
]

export const MRO_PRODUCTS = [
  // Power Tools
  { id: 1,  sku: 'PT-001', name: 'DeWalt 20V MAX Drill/Driver Kit',          category: 'Power Tools',            supplier: 'Grainger',          brand: 'DeWalt',       price: 149.99, inventory: 'In Stock',    qty: 48, unit: 'Kit',     isNew: false, isCritical: false },
  { id: 2,  sku: 'PT-002', name: 'Makita 4-1/2" Angle Grinder 7.5A',         category: 'Power Tools',            supplier: 'Fastenal',          brand: 'Makita',       price:  89.99, inventory: 'In Stock',    qty: 23, unit: 'Each',    isNew: true,  isCritical: false },
  { id: 3,  sku: 'PT-003', name: 'Bosch 1/2" Impact Wrench 18V Brushless',   category: 'Power Tools',            supplier: 'MSC Direct',        brand: 'Bosch',        price: 219.00, inventory: 'Low Stock',   qty:  4, unit: 'Each',    isNew: false, isCritical: true  },
  { id: 4,  sku: 'PT-004', name: 'Milwaukee M18 Circular Saw Kit 7-1/4"',    category: 'Power Tools',            supplier: 'Grainger',          brand: 'Milwaukee',    price: 299.00, inventory: 'In Stock',    qty: 15, unit: 'Kit',     isNew: true,  isCritical: false },
  { id: 5,  sku: 'PT-005', name: 'Stanley FatMax Reciprocating Saw 12A',     category: 'Power Tools',            supplier: 'MSC Direct',        brand: 'Stanley',      price: 129.00, inventory: 'Out of Stock', qty:  0, unit: 'Each',    isNew: false, isCritical: true  },
  // Bearings & Seals
  { id: 6,  sku: 'BR-001', name: 'SKF Deep Groove Ball Bearing 6205',        category: 'Bearings & Seals',       supplier: 'Applied Industrial',brand: 'SKF',          price:  12.50, inventory: 'In Stock',    qty:250, unit: 'Each',    isNew: false, isCritical: false },
  { id: 7,  sku: 'BR-002', name: 'Timken Tapered Roller Bearing Set LM11749',category: 'Bearings & Seals',       supplier: 'Applied Industrial',brand: 'Timken',       price:  45.00, inventory: 'In Stock',    qty: 80, unit: 'Each',    isNew: false, isCritical: false },
  { id: 8,  sku: 'BR-003', name: 'NSK Cylindrical Roller Bearing N212EW',    category: 'Bearings & Seals',       supplier: 'MSC Direct',        brand: 'NSK',          price:  67.50, inventory: 'Low Stock',   qty:  6, unit: 'Each',    isNew: false, isCritical: true  },
  { id: 9,  sku: 'BR-004', name: 'Parker V-Ring Shaft Seal 45mm ID',         category: 'Bearings & Seals',       supplier: 'Applied Industrial',brand: 'Parker',       price:   8.25, inventory: 'In Stock',    qty:500, unit: 'Each',    isNew: true,  isCritical: false },
  // Electric Motors
  { id: 10, sku: 'EM-001', name: 'ABB IE3 Premium Efficiency Motor 5HP',     category: 'Electric Motors',        supplier: 'Graybar',           brand: 'ABB',          price: 485.00, inventory: 'In Stock',    qty: 12, unit: 'Each',    isNew: false, isCritical: false },
  { id: 11, sku: 'EM-002', name: 'Baldor HVAC Motor 3HP 1800 RPM TEFC',      category: 'Electric Motors',        supplier: 'Applied Industrial',brand: 'Baldor',       price: 325.00, inventory: 'In Stock',    qty:  8, unit: 'Each',    isNew: false, isCritical: false },
  { id: 12, sku: 'EM-003', name: 'Leeson AC Motor 1HP 115/230V ODP',         category: 'Electric Motors',        supplier: 'Grainger',          brand: 'Leeson',       price: 198.00, inventory: 'Out of Stock', qty:  0, unit: 'Each',    isNew: false, isCritical: true  },
  { id: 13, sku: 'EM-004', name: 'WEG W22 Motor 10HP Premium Efficiency',    category: 'Electric Motors',        supplier: 'Graybar',           brand: 'WEG',          price: 720.00, inventory: 'Low Stock',   qty:  3, unit: 'Each',    isNew: true,  isCritical: true  },
  // Safety Equipment
  { id: 14, sku: 'SF-001', name: '3M Nitrile Exam Gloves Med Box/100',       category: 'Safety Equipment',       supplier: 'Grainger',          brand: '3M',           price:  18.99, inventory: 'In Stock',    qty:300, unit: 'Box',     isNew: false, isCritical: false },
  { id: 15, sku: 'SF-002', name: 'Honeywell Uvex Safety Glasses Clear Lens', category: 'Safety Equipment',       supplier: 'Fastenal',          brand: 'Honeywell',    price:   6.50, inventory: 'In Stock',    qty:150, unit: 'Each',    isNew: false, isCritical: false },
  { id: 16, sku: 'SF-003', name: 'MSA V-Gard Hard Hat Class E White',        category: 'Safety Equipment',       supplier: 'Grainger',          brand: 'MSA',          price:  22.00, inventory: 'In Stock',    qty: 85, unit: 'Each',    isNew: false, isCritical: false },
  { id: 17, sku: 'SF-004', name: '3M 8511 N95 Respirator Box/10',            category: 'Safety Equipment',       supplier: 'Fisher Scientific', brand: '3M',           price:  24.99, inventory: 'Low Stock',   qty:  5, unit: 'Box',     isNew: false, isCritical: true  },
  { id: 18, sku: 'SF-005', name: 'DuPont Tyvek Coverall Type 5/6 Sz.L',     category: 'Safety Equipment',       supplier: 'Imperial Supplies', brand: 'DuPont',       price:  14.75, inventory: 'In Stock',    qty: 60, unit: 'Each',    isNew: true,  isCritical: false },
  // Fasteners & Hardware
  { id: 19, sku: 'FT-001', name: 'Grade 8 Hex Bolt 3/8"-16 x 1" Box/100',   category: 'Fasteners & Hardware',   supplier: 'Fastenal',          brand: 'Generic',      price:  28.50, inventory: 'In Stock',    qty:200, unit: 'Box',     isNew: false, isCritical: false },
  { id: 20, sku: 'FT-002', name: 'SS 304 Socket Cap Screw M8x25 Box/50',    category: 'Fasteners & Hardware',   supplier: 'Imperial Supplies', brand: 'Generic',      price:  22.00, inventory: 'In Stock',    qty:120, unit: 'Box',     isNew: false, isCritical: false },
  { id: 21, sku: 'FT-003', name: 'Nylon Insert Lock Nut 1/2"-13 Box/50',    category: 'Fasteners & Hardware',   supplier: 'Fastenal',          brand: 'Generic',      price:  16.75, inventory: 'Low Stock',   qty:  8, unit: 'Box',     isNew: false, isCritical: false },
  { id: 22, sku: 'FT-004', name: 'Hilti KB-TZ2 Anchor 3/8"x3-3/4" Box/25', category: 'Fasteners & Hardware',   supplier: 'MSC Direct',        brand: 'Hilti',        price:  84.00, inventory: 'In Stock',    qty: 40, unit: 'Box',     isNew: true,  isCritical: false },
  // Lubricants & Chemicals
  { id: 23, sku: 'LB-001', name: 'Mobil Grease HP222 High-Perf 35 lb Pail', category: 'Lubricants & Chemicals', supplier: 'Applied Industrial',brand: 'Mobil',        price: 185.00, inventory: 'In Stock',    qty: 22, unit: 'Pail',    isNew: false, isCritical: false },
  { id: 24, sku: 'LB-002', name: 'Shell Tellus S2 Hydraulic Oil 46 55gal',  category: 'Lubricants & Chemicals', supplier: 'Fisher Scientific', brand: 'Shell',        price: 450.00, inventory: 'Low Stock',   qty:  3, unit: 'Drum',    isNew: false, isCritical: true  },
  { id: 25, sku: 'LB-003', name: 'WD-40 Specialist Spray 11oz 12-Pack',     category: 'Lubricants & Chemicals', supplier: 'Grainger',          brand: 'WD-40',        price:  56.00, inventory: 'In Stock',    qty: 75, unit: 'Pack',    isNew: false, isCritical: false },
  { id: 26, sku: 'LB-004', name: 'Loctite 243 Threadlocker Blue 50ml',      category: 'Lubricants & Chemicals', supplier: 'Imperial Supplies', brand: 'Loctite',      price:  32.50, inventory: 'In Stock',    qty: 45, unit: 'Each',    isNew: false, isCritical: false },
  // Pneumatics & Hydraulics
  { id: 27, sku: 'PN-001', name: 'Festo DSBC Double-Acting Cylinder 50mm',  category: 'Pneumatics & Hydraulics',supplier: 'Grainger',          brand: 'Festo',        price: 125.00, inventory: 'In Stock',    qty: 18, unit: 'Each',    isNew: false, isCritical: false },
  { id: 28, sku: 'PN-002', name: 'Parker B12B Air Regulator 1/4" BSP',      category: 'Pneumatics & Hydraulics',supplier: 'Applied Industrial',brand: 'Parker',       price:  48.00, inventory: 'In Stock',    qty: 30, unit: 'Each',    isNew: false, isCritical: false },
  { id: 29, sku: 'PN-003', name: 'SMC VF3130 5/2-Way Solenoid Valve',       category: 'Pneumatics & Hydraulics',supplier: 'Grainger',          brand: 'SMC',          price:  92.00, inventory: 'Low Stock',   qty:  5, unit: 'Each',    isNew: true,  isCritical: true  },
  { id: 30, sku: 'PN-004', name: 'Norgren 1/2" Filter Regulator Combo',     category: 'Pneumatics & Hydraulics',supplier: 'Applied Industrial',brand: 'Norgren',      price:  78.00, inventory: 'In Stock',    qty: 14, unit: 'Each',    isNew: false, isCritical: false },
  // Material Handling
  { id: 31, sku: 'MH-001', name: 'Uline Steel Drum Dolly 1000 lb Cap.',     category: 'Material Handling',      supplier: 'Uline',             brand: 'Uline',        price:  89.00, inventory: 'In Stock',    qty: 10, unit: 'Each',    isNew: false, isCritical: false },
  { id: 32, sku: 'MH-002', name: 'Vestil Pallet Jack 5500 lb w/ Scale',     category: 'Material Handling',      supplier: 'Grainger',          brand: 'Vestil',       price: 650.00, inventory: 'Low Stock',   qty:  2, unit: 'Each',    isNew: true,  isCritical: true  },
  { id: 33, sku: 'MH-003', name: 'Akro-Mils 30-Compartment Shelf Bins',     category: 'Material Handling',      supplier: 'Uline',             brand: 'Akro-Mils',    price:  44.50, inventory: 'In Stock',    qty: 55, unit: 'Set',     isNew: false, isCritical: false },
  // Packaging Materials
  { id: 34, sku: 'PK-001', name: '3M Scotch Box Tape 2"x55yd Case/36',      category: 'Packaging Materials',    supplier: 'Staples Business',  brand: '3M',           price:  54.99, inventory: 'In Stock',    qty: 90, unit: 'Case',    isNew: false, isCritical: false },
  { id: 35, sku: 'PK-002', name: 'Sealed Air Bubble Wrap 12"x100ft Roll',   category: 'Packaging Materials',    supplier: 'Uline',             brand: 'Sealed Air',   price:  28.75, inventory: 'In Stock',    qty: 45, unit: 'Roll',    isNew: false, isCritical: false },
  { id: 36, sku: 'PK-003', name: 'Intertape Kraft Paper 30lb 12"x900ft',    category: 'Packaging Materials',    supplier: 'Staples Business',  brand: 'Intertape',    price:  42.00, inventory: 'Low Stock',   qty:  7, unit: 'Roll',    isNew: false, isCritical: false },
  { id: 37, sku: 'PK-004', name: 'Ranpak PadPak Protective Wrap Jr 350ft',  category: 'Packaging Materials',    supplier: 'Uline',             brand: 'Ranpak',       price:  65.00, inventory: 'In Stock',    qty: 20, unit: 'Roll',    isNew: true,  isCritical: false },
  // Facility Maintenance
  { id: 38, sku: 'FM-001', name: 'Zep Industrial Purple Cleaner 1gal',       category: 'Facility Maintenance',   supplier: 'Grainger',          brand: 'Zep',          price:  18.50, inventory: 'In Stock',    qty: 48, unit: 'Gallon',  isNew: false, isCritical: false },
  { id: 39, sku: 'FM-002', name: 'Nilfisk Floor Scrubber Pads 17" Box/10',  category: 'Facility Maintenance',   supplier: 'Applied Industrial',brand: 'Nilfisk',      price:  35.00, inventory: 'In Stock',    qty: 25, unit: 'Box',     isNew: false, isCritical: false },
  { id: 40, sku: 'FM-003', name: 'Georgia-Pacific 2-Ply Toilet Paper 96pk', category: 'Facility Maintenance',   supplier: 'Staples Business',  brand: 'GP',           price:  68.99, inventory: 'In Stock',    qty: 18, unit: 'Case',    isNew: false, isCritical: false },
  { id: 41, sku: 'FM-004', name: 'Rubbermaid Brute 44gal Refuse Container', category: 'Facility Maintenance',   supplier: 'Uline',             brand: 'Rubbermaid',   price:  89.00, inventory: 'Low Stock',   qty:  4, unit: 'Each',    isNew: false, isCritical: false },
]
