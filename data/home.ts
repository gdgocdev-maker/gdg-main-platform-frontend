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
    {
      id: "4",
      img: "/images/project-placeholder.png",
      projectName: "Project Name 4",
      description: "Short Description of the project here",
      madeBy: "Developer community",
    },
    {
      id: "5",
      img: "/images/project-placeholder.png",
      projectName: "Project Name 5",
      description: "Short Description of the project here",
      madeBy: "Developer community",
    },
    {
      id: "6",
      img: "/images/project-placeholder.png",
      projectName: "Project Name 6",
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
    name: "Jumanah Alshibi",
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
      "A team focused on planning, organizing, and delivering successful projects that bring ideas to life.",
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
          "Designing and building modern, responsive, and user-friendly web experiences.",
        lead: {
          name: "Leen Alghamdi",
          image: "/images/web-lead.png",
        },
      },

      {
        id: "artificial-intelligence",
        name: "Artificial Intelligence",
        description:
          "Exploring artificial intelligence and developing smart solutions using modern AI technologies.",
        lead: {
          name: "Atheer Alzahrani",
          image: "/images/leader-default.png",
        },
      },

      {
        id: "robotics-iot",
        name: "Robotics & IOT",
        description:
          "Creating connected and intelligent systems by combining robotics, sensors, and IoT technologies.",
        lead: {
          name: "Saeed Alghamdi",
          image: "/images/leader-default.png",
        },
      },

      {
        id: "cybersecurity",
        name: "Cybersecurity",
        description:
          "A team focused on security, privacy, and protecting digital systems and information.",
        lead: {
          name: "Shadi Alnajar",
          image: "/images/Developers-Lead.png",
        },
      },

      {
        id: "automation",
        name: "Automation",
        description:
          "Building automated solutions that simplify processes, improve efficiency, and reduce repetitive tasks.",
        lead: {
          name: "Asma Aldossari",
          image: "/images/leader-default.png",
        },
      },

      {
        id: "data-analysis",
        name: "Data Analysis",
        description:
          "Turning data into meaningful insights through analysis, visualization, and data-driven solutions.",
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