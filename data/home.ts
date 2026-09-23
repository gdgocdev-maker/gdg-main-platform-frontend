//   Mock data, The actual data will be retrieved from database 
export const projects = [
    {
      id: "1",
      img: "/images/project-placeholder.png",
      projectName: "Project Name 1",
      description: "Short Description of the project here",
      madeBy: "Developer community",
    },
    {
      id: "2",
      img: "/images/project-placeholder.png",
      projectName: "Project Name 2",
      description: "Short Description of the project here",
      madeBy: "Developer community",
    },
    {
      id: "3",
      img: "/images/project-placeholder.png",
      projectName: "Project Name 3",
      description: "Short Description of the project here",
      madeBy: "Developer community",
    },
  ];
    
//   Mock data, The actual data will be retrieved from database 
export const events = [
    {
      id: "1",
      image: "/images/event-placeholder.png",
      name: "Event Name",
      date: "Sunday, September 20, 2026",
      time: "7:00 PM - 9:30 PM",
      location: "COCON Tree",
    },
    {
      id: "2",
      image: "/images/event-placeholder.png",
      name: "Event Name",
      date: "Sunday, September 20, 2026",
      time: "7:00 PM - 9:30 PM",
      location: "COCON Tree",
    },
    {
      id: "3",
      image: "/images/event-placeholder.png",
      name: "Event Name",
      date: "Sunday, September 20, 2026",
      time: "7:00 PM - 9:30 PM",
      location: "COCON Tree",
    },
  ];

  export const teamMembers = [
   {
    id: "1",
    image: "/images/Ahmed-advisor.png",
    role: "Advisor",
    name: "Ahmed Bawazeer",
  }, 
  {
    id: "2",
    image: "/images/jumanah-coleader.png",
    role: "Co-Lead",
    name: "Jumanah Alshaibi",
  },   
  {
    id: "3",
    image: "/images/abdullah-leader.png",
    role: "Lead",
    name: "Abdullah Misar",
  },
  {
    id: "4",
    image: "/images/Fahad-advisor.png",
    role: "Advisor",
    name: "Fahad Aljudaibi",
  },

];

export const committees = [
  {
    id: "content-writing",
    name: "Content Writing",
    color: "#FFD34E",
    description:
      "Creates and manages the group’s written and media content, ensuring content quality, consistency in style and identity, and clarity of messaging across various platforms.",
    lead: {
      name: "Asma Alhasani",
      image: "/images/leader-default.png",
    },
    coLeader:{
      name: "Sameera Radwan",
      image: "/images/leader-default.png",
    },
  },

  {
    id: "project-management",
    name: "Project Management",
    color: "#4285F4",
    description:
      "Where ideas become structured plans with clear owners, clear deadlines, and clear outcomes. We bring together planning, coordination, and follow through to turn vision into execution, and execution into results.",
    lead: {
      name: "Mohammed Elkasabgy",
      image: "/images/PM-lead.png",
    },
    coLeader:{
      name: "Shahad Almazrui",
      image: "/images/PM-colead.png",
    },
  },

  {
    id: "digital-media",
    name: "Digital Media and Design",
    color: "#EA4335",
    description:
      "A space where ideas transform into creativity through innovative designs, visual storytelling, and purposeful digital content. We bring together design, photography, video editing, and marketing to create content that reflects ideas and leaves an impact.",
    lead: {
      name: "Joud Abdullah",
      image: "/images/leader-default.png",
    },
    coLeader:{
      name: "Linda Alminhali",
      image: "/images/DMD-colead.png",
    },
  },

  {
    id: "public-relations",
    name: "Public Relations",
    color: "#34A853",
    description:
      "Representing the group externally, building strong relationships, and strengthening its image with partners, stakeholders, and the wider community.",
    lead: {
      name: "Layan Mashraie",
      image: "/images/leader-default.png",
    },
    coLeader:{
      name: "Abdullah Saif",
      image: "/images/PR-colead.png",
    },
  },

  {
    id: "developers",
    name: "Developers",
    color: "#000000",
    description:
      "A space for builders, problem-solvers, and technology enthusiasts to learn, create, and build meaningful solutions together.",
    lead: {
      name: "Shadi Alnajar",
      image: "/images/Developers-Lead.png",
    },

    subCommittees: [
      {
        id: "web-development",
        name: "Web Design & Development",
        description:
          " A creative space for developers passionate about building modern web experiences. Members explore frontend and backend development, from design to deployment. The committee works with modern technologies to create functional and responsive websites. It encourages collaboration, problem solving, and clean development practices. Members turn ideas into real digital experiences and practical projects. ",
        lead: {
          name: "Leen Alghamdi",
          image: "/images/web-lead.png",
        },
      },

      {
        id: "artificial-intelligence",
        name: "Artificial Intelligence",
        description:
          "A space for exploring the world of artificial intelligence and emerging technologies. Members learn about AI concepts, machine learning, and intelligent applications. The committee encourages experimentation with AI tools and real-world use cases. Members collaborate on innovative projects that use AI to solve meaningful problems. It aims to make AI more accessible, practical, and impactful. ",
        lead: {
          name: "Atheer Alzahrani",
          image: "/images/leader-default.png",
        },
      },

      {
        id: "robotics-iot",
        name: "Robotics & IOT",
        description:
          "A hands-on space for building smart systems that connect the physical and digital worlds. Members explore robotics, sensors, embedded systems, and Internet of Things technologies. The committee encourages experimentation, prototyping, and practical problem-solving. Members work together to design and build interactive and connected solutions. It turns ideas into real-world systems through technology and creativity. ",
        lead: {
          name: "Saeed Alghamdi",
          image: "/images/leader-default.png",
        },
      },

      {
        id: "cybersecurity",
        name: "Cybersecurity",
        description:
          "A space for learning how to protect systems, applications, networks, and digital information. Members explore cybersecurity concepts, security practices, and common digital threats. The committee promotes awareness of secure development and responsible technology use. Members practice identifying vulnerabilities and understanding how systems can be protected. It builds a strong foundation for creating safer and more secure digital environments. ",
        lead: {
          name: "Shadi Alnajar",
          image: "/images/Developers-Lead.png",
        },
      },

      {
        id: "automation",
        name: "Automation",
        description:
          " A space focused on using technology to simplify tasks and improve workflows. Members explore automation tools, scripting, APIs, and process optimization. The committee encourages finding repetitive tasks that can be transformed into efficient solutions. Members collaborate to build automated workflows and practical productivity tools. It helps turn time-consuming processes into smarter and more efficient systems. ",
        lead: {
          name: "Asma Aldossari",
          image: "/images/leader-default.png",
        },
      },

      {
        id: "data-analysis",
        name: "Data Analysis",
        description:
          "A space for turning raw data into meaningful insights and informed decisions. Members explore data collection, cleaning, analysis, visualization, and interpretation. The committee works with real-world datasets to understand patterns and trends. Members develop analytical thinking and learn how to communicate insights effectively. It connects data with practical solutions, helping transform information into knowledge. ",
        lead: {
          name: "Shahad Almazrui",
          image: "/images/PM-colead.png",
        },
      },
    ],
  },
];

export const sponsors = [
  {
    id: 1,
    image: "/images/sponsor-arena-beans.png",
    name: "Arena Beans",
  },
  {
    id: 2,
    image: "/images/sponsor-bakery.png",
    name: "Bakery",
  },
  {
    id: 3,
    image: "/images/sponsor-lahen.png",
    name: "Lahen",
  },
  {
    id: 4,
    image: "/images/sponsor-noosh.png",
    name: "Noosh",
  },
  {
    id: 5,
    image: "/images/sponsor-print.png",
    name: "Print",
  },
];

export const offers = [
  {
    number: 1,
    color: "#D00000",
    title: "Learn & Grow",
    description: "Access workshops, talks, and learning opportunities.",
  },
  {
    number: 2,
    color: "#017FCB",
    title: "Connect",
    description:
      "Meet developers, members, and people who share your interests.",
  },
  {
    number: 3,
    color: "#34A852",
    title: "Build Together",
    description: "Collaborate on projects and turn ideas into reality.",
  },
  {
    number: 4,
    color: "#FFD327",
    title: "Join Events",
    description:
      "Discover upcoming events and register to participate.",
  },
  {
    number: 5,
    color: "#017FCB",
    title: "Show Your Work",
    description:
      "Share your projects and achievements with the community.",
  },
];