export async function loadNDVI(cityCode) {
  if (cityCode === "BUC") {
    const data = await import("../data/ndvi_bucharest.json");
    return data.default;
  }
  if (cityCode === "CPH") {
    const data = await import("../data/ndvi_copenhagen.json");
    return data.default;
  }
  // Add other cities later...
  return [];
}

export async function loadNO2(cityCode) {
  if (cityCode === "BUC") {
    const data = await import("../data/no2_grid_bucharest.json");
    return data.default;
  }
  if (cityCode === "CPH") {
    const data = await import("../data/no2_grid_copenhagen.json");
    return data.default;
  }
  // Add other cities later...
  return null;
}

export async function loadO3(cityCode) {
  if (cityCode === "BUC") {
    const data = await import("../data/o3_grid_bucharest.json");
    return data.default;
  }
  if (cityCode === "CPH") {
    const data = await import("../data/o3_grid_copenhagen.json");
    return data.default;
  }
  // Add other cities later...
  return null;
}


export async function loadCLM(cityCode) {
  if (cityCode === "BUC") {
    const data = await import("../data2/clm_grid_bucharest.json");
    return data.default;
  }
  if (cityCode === "CPH") {
    const data = await import("../data2/clm_grid_copenhagen.json");
    return data.default;
  }
  // Add other cities later...
  return null;
}


export async function loadEvents() {
  // if (cityCode === "CPH") {
  const data = await import("../data/events.json");
  return data.default;
  // }
}

export async function loadEvents2(cityCode) {

  if (cityCode === "BUC") {
    const data = await import("../data2/events_buc.json");
    return data.default;
  }

  if (cityCode === "CPH") {
    const data = await import("../data2/events_cph.json");
    return data.default;
  }
  // Add other cities later...
  return null;
}



