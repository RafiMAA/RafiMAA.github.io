export type Project = {
  id: string;
  title: string;
  label: string;
  description: string;
  tags: string[];
  stack: string[];
  image?: string;
  featured?: boolean;
  github?: string;
  report?: string;
};

export const projects: Project[] = [
  {
    id: 'school-management',
    title: 'School Management System',
    label: 'Production full-stack',
    description: 'Attendance and student management used by a school of approximately 700 students, with mobile access, notifications, and automated reports.',
    tags: ['Full-Stack'],
    stack: ['React', 'FastAPI', 'Supabase', 'PostgreSQL'],
    image: '/images/Projects/School Management.jpeg',
    featured: true,
    github: 'https://github.com/RafiMAA/School_Student_Management_System',
  },
  {
    id: 'kandypack',
    title: 'Kandypack Distribution',
    label: 'Logistics platform',
    description: 'A hybrid rail-and-road logistics system with automated allocation, operational rules enforced in MySQL, and role-based workflows.',
    tags: ['Full-Stack'],
    stack: ['React', 'Node.js', 'Express', 'MySQL'],
    image: '/images/Projects/KandyPack.jpeg',
    featured: true,
    github: 'https://github.com/DinuuCoder/kandypack_project',
  },
{
  id: 'ontime',
  title: 'OnTime Distributed Transit System',
  label: 'Distributed messaging backbone',
  description:
    'Contributed to the messaging backbone of a distributed public-transit platform using HiveMQ MQTT, Apache Kafka, FastAPI WebSockets, and Redis for real-time telemetry, inter-service communication, and live data delivery.',
  tags: ['Systems', 'Full-Stack'],
  stack: [
    'Apache Kafka',
    'KRaft',
    'HiveMQ',
    'MQTT',
    'FastAPI',
    'WebSockets',
    'Redis',
    'Docker',
    'Kubernetes',
  ],
  image: '/images/Projects/on Time Distributed.jpeg',
  featured: true,
  github: 'https://github.com/OnTime-SE-G/ontime-g4',
},
  {
    id: 'easy-pharma',
    title: 'Easy Pharma — Prescription OCR',
    label: 'Healthcare AI',
    description: 'A prescription-scanning web application that converts prescription images into structured, reviewable medicine lists using a hybrid OCR pipeline.',
    tags: ['AI/CV', 'Full-Stack'],
    stack: ['React', 'FastAPI', 'OpenCV', 'Tesseract'],
    image: '/images/Projects/Easypharma_OCR.png',
    featured: true,
    github: 'https://github.com/RafiMAA/Easypharma_OCR_Pipeline',
  },
  {
    id: 'unitree-g1',
    title: 'Unitree G1 Humanoid',
    label: 'Humanoid autonomy',
    description: 'ROS 2 localization, navigation, and perception in simulation, paired with an LLM + RAG interface grounded in retrieved knowledge.',
    tags: ['Robotics', 'AI/CV'],
    stack: ['ROS 2', 'Unitree G1', 'LLM', 'RAG'],
    image: '/images/Projects/Unitree G1.jpeg',
    featured: true,
    github: 'https://github.com/RafiMAA/Unitree_G1_EDU_Robot',
    report: 'https://github.com/RafiMAA/Unitree_G1_EDU_Robot/blob/f5134e8c5424f13ccc09694337266d48714b3adb/docs/report/g1_report.pdf',
  },
  {
    id: 'bathymetric-drone',
    title: 'Bathymetric Survey Drone',
    label: 'Autonomous systems',
    description: 'An autonomous reservoir survey platform with vision-based water detection, sonar depth acquisition, and a live 3D ground station.',
    tags: ['Robotics', 'AI/CV'],
    stack: ['ROS 2', 'ArduPilot', 'OpenCV', 'Three.js'],
    image: '/images/Projects/Drone.jpeg',
    featured: true,
    github: 'https://github.com/RafiMAA/ROS2_Autonomous_Bathymetric_Survey_System_with_Ardupilot',
    report: 'https://github.com/RafiMAA/ROS2_Autonomous_Bathymetric_Survey_System_with_Ardupilot/blob/99caa06d9c093e2361772368eddefa4fb9d4c2b5/docs/report/bathymetric_survey_paper.pdf',
  },
  {
    id: 'qbot-navigation',
    title: 'QBot Navigation',
    label: 'Mobile robotics',
    description: 'Indoor mapping and goal navigation using LiDAR and SLAM, with A* planning, Pure Pursuit control, and a live React dashboard.',
    tags: ['Robotics'],
    stack: ['ROS 2', 'SLAM', 'LiDAR', 'React'],
    image: '/images/Projects/Qbot.jpeg',
    featured: true,
    github: 'https://github.com/RafiMAA/Qbot_mapping_and_navigating_to_the_goal',
    report: 'https://github.com/RafiMAA/Qbot_mapping_and_navigating_to_the_goal/blob/be72d01b4c70d59011fe59a467bfc52ddcf8f1c3/docs/report/qbot_paper.pdf',
  },
  {
    id: 'nano-processor',
    title: 'Nano Processor',
    label: 'Digital systems',
    description: 'A processor architecture designed in VHDL and verified on FPGA hardware from component-level logic through system behavior.',
    tags: ['Systems'],
    stack: ['VHDL', 'FPGA', 'Digital Logic'],
    image: '/images/Projects/Nano Processor.jpeg',
    featured: true,
    github: 'https://github.com/RafiMAA/Nano_Processor',
  },
];
