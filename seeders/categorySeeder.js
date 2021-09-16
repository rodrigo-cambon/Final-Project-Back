const faker = require("faker");
const { Category } = require("../models");
faker.locale = "es";

module.exports = async () => {
  const categories = [];

  categories.push({
    name: "Radeon",
    description:
      "Radeon (/ˈreɪdiɒn/) is a brand of computer products, including graphics processing units, random-access memory, RAM disk software, and solid-state drives, produced by Radeon Technologies Group, a division of Advanced Micro Devices (AMD).",
    img: "Radeon.jpg",
  });
  categories.push({
    name: "Intel",
    description:
      "Intel Corporation is an American multinational corporation and technology company headquartered in Santa Clara, California, in Silicon Valley. It is the world's largest semiconductor chip manufacturer by revenue,[3][4] and is the developer of the x86 series of microprocessors, the processors found in most personal computers (PCs).",
    img: "Intel.jpg",
  });
  categories.push({
    name: "Ryzen",
    description:
      "Ryzen (pronounced RYE zen) is an AMD CPU aimed at the server, desktop, workstation, media center PC and all-in-one markets. AMD's Ryzen base models feature eight cores and 16-thread processing at 3.4Ghz with 20MB cache, neural net-based prediction hardware and smart prefetch.",
    img: "Ryzen.jpg",
  });
  categories.push({
    name: "Nvidia",
    description:
      "NVIDIA Corporation operates as a visual computing company worldwide. It operates in two segments, Graphics and Compute & Networking. ... The company's products are used in gaming, professional visualization, datacenter, and automotive markets",
    img: "Nvidia.jpg",
  });
  categories.push({
    name: "Limit Breaker PCs",
    description: "The best PCs on the market. Made only with the most powerful components and the best brands.",
    img: "LimitBreaker.jpg",
  });

  await Category.bulkCreate(categories);
  console.log("[Database] Se corrió el seeder de categorys.");
};
