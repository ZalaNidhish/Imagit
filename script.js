const filters = document.querySelector(".filters");
const presets = document.querySelector(".presets");
const reset = document.querySelector(".reset-btn");
const download = document.querySelector(".download-btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const choose = document.querySelector("#image-choose");
const placeholder = document.querySelector(".placeholder");
let img = "";

let default_filter = {
  blur: {
    min: 0,
    max: 50,
    value: 0,
    unit: "px",
  },
  brightness: {
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
  },
  contrast: {
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
  },
  grayscale: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  sepia: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  invert: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  opacity: {
    min: 0,
    max: 100,
    value: 100,
    unit: "%",
  },
  saturate: {
    min: 0,
    max: 300,
    value: 100,
    unit: "%",
  },
  hue_rotate: {
    min: 0,
    max: 360,
    value: 0,
    unit: "deg",
  },
};

let imagePresets = {
  vintage: {
    blur: { min: 0, max: 50, value: 2, unit: "px" },
    brightness: { min: 0, max: 200, value: 110, unit: "%" },
    contrast: { min: 0, max: 200, value: 120, unit: "%" },
    grayscale: { min: 0, max: 100, value: 20, unit: "%" },
    sepia: { min: 0, max: 100, value: 50, unit: "%" },
    invert: { min: 0, max: 100, value: 0, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 130, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 10, unit: "deg" }
  },
  dreamy: {
    blur: { min: 0, max: 50, value: 4, unit: "px" },
    brightness: { min: 0, max: 200, value: 140, unit: "%" },
    contrast: { min: 0, max: 200, value: 90, unit: "%" },
    grayscale: { min: 0, max: 100, value: 0, unit: "%" },
    sepia: { min: 0, max: 100, value: 10, unit: "%" },
    invert: { min: 0, max: 100, value: 0, unit: "%" },
    opacity: { min: 0, max: 100, value: 90, unit: "%" },
    saturate: { min: 0, max: 300, value: 180, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 20, unit: "deg" }
  },
  noir: {
    blur: { min: 0, max: 50, value: 0, unit: "px" },
    brightness: { min: 0, max: 200, value: 90, unit: "%" },
    contrast: { min: 0, max: 200, value: 150, unit: "%" },
    grayscale: { min: 0, max: 100, value: 100, unit: "%" },
    sepia: { min: 0, max: 100, value: 0, unit: "%" },
    invert: { min: 0, max: 100, value: 0, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 80, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 0, unit: "deg" }
  },
  popArt: {
    blur: { min: 0, max: 50, value: 1, unit: "px" },
    brightness: { min: 0, max: 200, value: 130, unit: "%" },
    contrast: { min: 0, max: 200, value: 170, unit: "%" },
    grayscale: { min: 0, max: 100, value: 0, unit: "%" },
    sepia: { min: 0, max: 100, value: 0, unit: "%" },
    invert: { min: 0, max: 100, value: 10, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 200, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 45, unit: "deg" }
  },
  inverted: {
    blur: { min: 0, max: 50, value: 0, unit: "px" },
    brightness: { min: 0, max: 200, value: 100, unit: "%" },
    contrast: { min: 0, max: 200, value: 100, unit: "%" },
    grayscale: { min: 0, max: 100, value: 0, unit: "%" },
    sepia: { min: 0, max: 100, value: 0, unit: "%" },
    invert: { min: 0, max: 100, value: 100, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 100, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 180, unit: "deg" }
  },
  cinematic: {
    blur: { min: 0, max: 50, value: 2, unit: "px" },
    brightness: { min: 0, max: 200, value: 95, unit: "%" },
    contrast: { min: 0, max: 200, value: 140, unit: "%" },
    grayscale: { min: 0, max: 100, value: 5, unit: "%" },
    sepia: { min: 0, max: 100, value: 20, unit: "%" },
    invert: { min: 0, max: 100, value: 0, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 120, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 5, unit: "deg" }
  },
  warm: {
    blur: { min: 0, max: 50, value: 0, unit: "px" },
    brightness: { min: 0, max: 200, value: 120, unit: "%" },
    contrast: { min: 0, max: 200, value: 110, unit: "%" },
    grayscale: { min: 0, max: 100, value: 0, unit: "%" },
    sepia: { min: 0, max: 100, value: 40, unit: "%" },
    invert: { min: 0, max: 100, value: 0, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 150, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 15, unit: "deg" }
  },
  cold: {
    blur: { min: 0, max: 50, value: 0, unit: "px" },
    brightness: { min: 0, max: 200, value: 110, unit: "%" },
    contrast: { min: 0, max: 200, value: 100, unit: "%" },
    grayscale: { min: 0, max: 100, value: 10, unit: "%" },
    sepia: { min: 0, max: 100, value: 0, unit: "%" },
    invert: { min: 0, max: 100, value: 5, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 120, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 200, unit: "deg" }
  },
  retro: {
    blur: { min: 0, max: 50, value: 1, unit: "px" },
    brightness: { min: 0, max: 200, value: 105, unit: "%" },
    contrast: { min: 0, max: 200, value: 130, unit: "%" },
    grayscale: { min: 0, max: 100, value: 15, unit: "%" },
    sepia: { min: 0, max: 100, value: 60, unit: "%" },
    invert: { min: 0, max: 100, value: 0, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    saturate: { min: 0, max: 300, value: 110, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 25, unit: "deg" }
  },
  surreal: {
    blur: { min: 0, max: 50, value: 5, unit: "px" },
    brightness: { min: 0, max: 200, value: 160, unit: "%" },
    contrast: { min: 0, max: 200, value: 80, unit: "%" },
    grayscale: { min: 0, max: 100, value: 0, unit: "%" },
    sepia: { min: 0, max: 100, value: 0, unit: "%" },
    invert: { min: 0, max: 100, value: 20, unit: "%" },
    opacity: { min: 0, max: 100, value: 95, unit: "%" },
    saturate: { min: 0, max: 300, value: 250, unit: "%" },
    hue_rotate: { min: 0, max: 360, value: 300, unit: "deg" }
  }
};



choose.addEventListener("change", () => {
  const file = choose.files[0];
  placeholder.style.display = "none";
  canvas.style.display = "initial";
  img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.drawImage(img, 0, 0);
  };
});

const createSideBar = () => {
  filters.innerHTML = ""; 
  Object.keys(default_filter).forEach((filter) => {
    let min = default_filter[filter].min;
    let max = default_filter[filter].max;
    let value = default_filter[filter].value;
    let input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    let h4 = document.createElement("h4");
    let div = document.createElement("div");
    div.classList.add("filter");
    h4.textContent = filter;
    div.appendChild(h4);
    div.appendChild(input);
    filters.appendChild(div);

    input.addEventListener("input", () => {
      default_filter[filter].value = input.value;
      applyFilter();
    });
  });
};
createSideBar();

const createPresets = () =>{
    Object.keys(imagePresets).forEach(preset=>{
        let div = document.createElement("div")
        div.classList.add("btn")
        div.innerText = preset
        presets.appendChild(div)

        div.addEventListener("click", ()=>{
          applyPreset(preset)
          
        })

    })
}
createPresets()

const applyFilter = ()=>{
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.filter = `
    blur(${default_filter.blur.value}${default_filter.blur.unit})
    brightness(${default_filter.brightness.value}${default_filter.brightness.unit})
    contrast(${default_filter.contrast.value}${default_filter.contrast.unit})
    grayscale(${default_filter.grayscale.value}${default_filter.grayscale.unit})
    sepia(${default_filter.sepia.value}${default_filter.sepia.unit})
    invert(${default_filter.invert.value}${default_filter.invert.unit})
    opacity(${default_filter.opacity.value}${default_filter.opacity.unit})
    saturate(${default_filter.saturate.value}${default_filter.saturate.unit})
    hue-rotate(${default_filter.hue_rotate.value}${default_filter.hue_rotate.unit})
    `
    ctx.drawImage(img, 0, 0)
}

reset.addEventListener("click", () => {
  default_filter = {
  blur: {
    min: 0,
    max: 50,
    value: 0,
    unit: "px",
  },
  brightness: {
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
  },
  contrast: {
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
  },
  grayscale: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  sepia: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  invert: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  opacity: {
    min: 0,
    max: 100,
    value: 100,
    unit: "%",
  },
  saturate: {
    min: 0,
    max: 300,
    value: 100,
    unit: "%",
  },
  hue_rotate: {
    min: 0,
    max: 360,
    value: 0,
    unit: "deg",
  },
};
  createSideBar();
  applyFilter();
  
});

download.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});


const applyPreset = (preset)=>{

  obj = imagePresets[preset]
  
  Object.keys(imagePresets[preset]).forEach(filter => {
    
    default_filter[filter].value = obj[filter].value;
  })

  createSideBar()
  applyFilter()
}

