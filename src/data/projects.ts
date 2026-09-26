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
    title: 'OnTime Transit System',
    label: 'Distributed systems',
    description: 'Event-driven transit services using Kafka and MQTT for resilient, real-time communication between distributed components.',
    tags: ['Systems', 'Full-Stack'],
    stack: ['Kafka', 'MQTT', 'Distributed Systems'],
    image: '/images/Projects/on Time Distributed.jpeg',
    featured: true,
    github: 'https://github.com/OnTime-SE-G/ontime-g4',
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
    report: 'https://github.com/RafiMAA/Unitree_G1_EDU_Robot/blob/main/docs/paper/g1_paper.pdf',
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
    report: 'https://github.com/RafiMAA/ROS2_Autonomous_Bathymetric_Survey_System_with_Ardupilot/blob/main/docs/paper/bathymetric_survey_paper.pdf',
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
    report: 'https://github.com/RafiMAA/Qbot_mapping_and_navigating_to_the_goal/blob/main/docs/paper/qbot_paper.pdf',
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
