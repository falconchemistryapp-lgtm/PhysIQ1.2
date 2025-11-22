export interface Topic {
  name: string;
}

export interface Chapter {
  year: '1st Year PUC' | '2nd Year PUC';
  name:string;
  topics: Topic[];
}

export const physicsChapters: Chapter[] = [
  // 1st Year PUC Chapters
  {
    year: '1st Year PUC',
    name: 'Physical World',
    topics: [
      { name: 'What is Physics?' },
      { name: 'Scope and Excitement of Physics' },
      { name: 'Fundamental Forces in Nature' },
      { name: 'Nature of Physical Laws' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Units and Measurement',
    topics: [
      { name: 'The International System of Units' },
      { name: 'Measurement of Length, Mass and Time' },
      { name: 'Significant Figures' },
      { name: 'Dimensions of Physical Quantities' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Motion in a Straight Line',
    topics: [
        { name: 'Position, Path Length and Displacement' },
        { name: 'Average Velocity and Average Speed' },
        { name: 'Instantaneous Velocity and Speed' },
        { name: 'Kinematic Equations for Uniformly Accelerated Motion' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Motion in a Plane',
    topics: [
        { name: 'Scalars and Vectors' },
        { name: 'Resolution of Vectors' },
        { name: 'Motion in a Plane with Constant Acceleration' },
        { name: 'Projectile Motion' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Laws of Motion',
    topics: [
        { name: 'Newton\'s First Law of Motion' },
        { name: 'Newton\'s Second Law of Motion' },
        { name: 'Newton\'s Third Law of Motion' },
        { name: 'Conservation of Momentum' },
        { name: 'Friction' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Work, Energy and Power',
    topics: [
        { name: 'The Work-Energy Theorem' },
        { name: 'Work' },
        { name: 'Kinetic and Potential Energy' },
        { name: 'Conservation of Mechanical Energy' },
        { name: 'Power' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'System of Particles and Rotational Motion',
    topics: [
        { name: 'Centre of Mass' },
        { name: 'Moment of Inertia' },
        { name: 'Theorems of Perpendicular and Parallel Axes' },
        { name: 'Torque and Angular Momentum' },
        { name: 'Conservation of Angular Momentum' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Gravitation',
    topics: [
        { name: 'Kepler\'s Laws' },
        { name: 'Universal Law of Gravitation' },
        { name: 'Acceleration due to Gravity' },
        { name: 'Gravitational Potential Energy' },
        { name: 'Escape Speed' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Mechanical Properties of Solids',
    topics: [
        { name: 'Stress and Strain' },
        { name: 'Hooke\'s Law' },
        { name: 'Stress-strain Curve' },
        { name: 'Elastic Moduli' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Mechanical Properties of Fluids',
    topics: [
        { name: 'Pressure & Pascal\'s Law' },
        { name: 'Bernoulli\'s Principle' },
        { name: 'Viscosity and Stokes\' Law' },
        { name: 'Surface Tension' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Thermal Properties of Matter',
    topics: [
        { name: 'Temperature and Heat' },
        { name: 'Specific Heat Capacity' },
        { name: 'Change of State and Latent Heat' },
        { name: 'Heat Transfer' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Thermodynamics',
    topics: [
        { name: 'Thermal Equilibrium' },
        { name: 'Zeroth Law of Thermodynamics' },
        { name: 'First Law of Thermodynamics' },
        { name: 'Second Law of Thermodynamics' },
        { name: 'Heat Engines' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Kinetic Theory',
    topics: [
        { name: 'Kinetic Theory of an Ideal Gas' },
        { name: 'Law of Equipartition of Energy' },
        { name: 'Specific Heat Capacities' },
        { name: 'Mean Free Path' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Oscillations',
    topics: [
        { name: 'Simple Harmonic Motion (SHM)' },
        { name: 'Energy in SHM' },
        { name: 'Damped Simple Harmonic Motion' },
        { name: 'Forced Oscillations and Resonance' },
    ],
  },
  {
    year: '1st Year PUC',
    name: 'Waves',
    topics: [
        { name: 'Transverse and Longitudinal Waves' },
        { name: 'Displacement Relation in a Progressive Wave' },
        { name: 'The Principle of Superposition of Waves' },
        { name: 'Reflection of Waves' },
        { name: 'Beats and Doppler Effect' },
    ],
  },
  // 2nd Year PUC Chapters
  {
    year: '2nd Year PUC',
    name: 'Electric Charges and Fields',
    topics: [
      { name: 'Electric Charge and Conductors' },
      { name: 'Coulomb\'s Law' },
      { name: 'Electric Field and Electric Field Lines' },
      { name: 'Gauss\'s Law and its Applications' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Electrostatic Potential and Capacitance',
    topics: [
      { name: 'Electrostatic Potential' },
      { name: 'Potential due to an Electric Dipole' },
      { name: 'Capacitors and Capacitance' },
      { name: 'The Parallel Plate Capacitor' },
      { name: 'Energy Stored in a Capacitor' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Current Electricity',
    topics: [
      { name: 'Ohm\'s Law and its Limitations' },
      { name: 'Resistivity of Various Materials' },
      { name: 'Combination of Resistors' },
      { name: 'Kirchhoff\'s Rules' },
      { name: 'Meter Bridge and Potentiometer' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Moving Charges and Magnetism',
    topics: [
      { name: 'Magnetic Force' },
      { name: 'Motion in a Magnetic Field' },
      { name: 'Biot-Savart Law' },
      { name: 'Ampere\'s Circuital Law' },
      { name: 'The Solenoid and the Toroid' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Electromagnetic Induction',
    topics: [
      { name: 'The Experiments of Faraday and Henry' },
      { name: 'Magnetic Flux' },
      { name: 'Faraday\'s Law of Induction' },
      { name: 'Lenz\'s Law and Conservation of Energy' },
      { name: 'Inductance' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Alternating Current',
    topics: [
      { name: 'AC Voltage Applied to a Resistor' },
      { name: 'AC Voltage Applied to an Inductor' },
      { name: 'AC Voltage Applied to a Capacitor' },
      { name: 'LC Oscillations' },
      { name: 'Transformers' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Ray Optics and Optical Instruments',
    topics: [
      { name: 'Reflection of Light by Spherical Mirrors' },
      { name: 'Refraction and Total Internal Reflection' },
      { name: 'Refraction at Spherical Surfaces and by Lenses' },
      { name: 'Optical Instruments' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Wave Optics',
    topics: [
      { name: 'Huygens Principle' },
      { name: 'Interference of Light Waves and Young\'s Experiment' },
      { name: 'Diffraction' },
      { name: 'Polarisation' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Dual Nature of Radiation and Matter',
    topics: [
      { name: 'Photoelectric Effect' },
      { name: 'Einstein\'s Photoelectric Equation' },
      { name: 'Wave Nature of Matter' },
      { name: 'Davisson and Germer Experiment' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Atoms',
    topics: [
      { name: 'Alpha-particle Scattering and Rutherford\'s Nuclear Model' },
      { name: 'Bohr Model of the Hydrogen Atom' },
      { name: 'Line Spectra of the Hydrogen Atom' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Nuclei',
    topics: [
      { name: 'Composition and Size of the Nucleus' },
      { name: 'Mass-Energy and Nuclear Binding Energy' },
      { name: 'Nuclear Force' },
      { name: 'Radioactivity' },
      { name: 'Nuclear Energy' },
    ],
  },
  {
    year: '2nd Year PUC',
    name: 'Semiconductor Electronics',
    topics: [
      { name: 'Intrinsic and Extrinsic Semiconductor' },
      { name: 'p-n Junction' },
      { name: 'Semiconductor Diode' },
      { name: 'Junction Transistor' },
    ],
  },
];