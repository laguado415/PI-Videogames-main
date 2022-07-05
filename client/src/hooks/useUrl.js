/*
   setea url
   addUrl recibe Object 
   resetRequest recibe el name de request'request', y data (para el filtro)
   resetRequest  request 'All' elimina todos los filtros
*/

export default function useUrl(url) {
  const setRequest = (data) => {
    let request = Object.keys(data).join();
    switch (request) {
      case "find":
        url.page = "";
        url[request] = `&find[name]=${data[request]}`;
        break;
      case "filter":
        url.page = "";
        url[request].push(
          `&filter[${data[request].name}]=${data[request].value}`
        );
        break;
      case "order":
        url.page = "";
        let { name, value } = data[request];
        url[request] = `&order[${name}]=${value}`;
        break;
      case "page":
        url[request] = `&page=${data[request]}`;
        break;
      default:
        data = "";
    }
  };

  const addUrl = (data) => {
    setRequest(data);
    return { ...url };
  };

  const resetUrl = () => {
    return {
      ...url,
      find: "",
      filter: [],
      order: "",
      page: "",
    };
  };

  const resetRequest = (request, data) => {
    let defaultValues = {
      find: "",
      filter: [],
      order: "",
    };

    //----delete all-filter--
    if (request === "All") {
      return { ...url, filter: [], page: "" };
    }

    //---delete filter
    if (request === "filter") {
      let { name, value } = data.filter;
      let filter = [...url.filter];
      let validateString = `&filter[${name}]=${value}`;
      if (filter.includes(validateString)) {
        url.filter = filter.filter((filter) => filter !== validateString);
        return { ...url, page: "" };
      }
    }

    if (defaultValues.hasOwnProperty(request)) {
      return { ...url, [request]: defaultValues[request], page: "" };
    }
  };

  return { addUrl, resetRequest, resetUrl };
}
