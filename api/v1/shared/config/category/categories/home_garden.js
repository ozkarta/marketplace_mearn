let appliances = require("./home_garden/appliances");
let arts = require("./home_garden/arts");
let bedding_bathing = require("./home_garden/bedding_bathing");
let furniture = require("./home_garden/furniture");
let home = require("./home_garden/home");
let kitchen_dinning = require("./home_garden/kitchen_dinning");
let patio_lawn_garden = require("./home_garden/patio_lawn_garden");
let pets = require("./home_garden/pets");
let tools_home_improvements = require("./home_garden/tools_home_improvements");


module.exports = [
  {
    category_name: "@home@",
    type: "child",
    child_category: home,
    show_in_search: true
  },
  {
    category_name: "@kitchen&dining@",
    type: "child",
    child_category: kitchen_dinning,
    show_in_search: true
  },
  {
    category_name: "@furniture@",
    type: "child",
    child_category: furniture,
    show_in_search: true
  },
  {
    category_name: "@bedding&bathing@",
    type: "child",
    child_category: bedding_bathing,
    show_in_search: true
  },
  {
    category_name: "@hoe_appliances@",
    type: "child",
    child_category: appliances,
    show_in_search: true
  },
  {
    category_name: "@patio&lawn&garden@",
    type: "child",
    child_category: patio_lawn_garden,
    show_in_search: true
  },
  {
    category_name: "@arts&crafts&sewing@",
    type: "child",
    child_category: arts,
    show_in_search: true
  },
  {
    category_name: "@pets@",
    type: "child",
    child_category: pets,
    show_in_search: true
  },
  {
    category_name: "@tools&home_improvement@",
    type: "child",
    child_category: tools_home_improvements,
    show_in_search: true
  }
];