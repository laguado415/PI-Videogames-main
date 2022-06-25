/*
   setea url
   addUrl recibe Object 
   resetRequest recibe el name de request'request'

*/

export default function useUrl(url) {
  const setRequest = (data) => {
    let request = Object.keys(data).join();
    switch (request) {
      case "find":
        url.page = "";
        return (data[request] = `&find[name]=${data[request]}`);
      case "filter":
        url.page = "";
        return (data[request] = ``);
      case "order":
        url.page = "";
        let { name, value } = data[request];
        return (data[request] = `&order[${name}]=${value}`);
      case "page":
        return (data[request] = `&page=${data[request]}`);
      default:
        return;
    }
  };

  const addUrl = (data) => {
    setRequest(data);
    if (data.filter) {
      return { ...url };
    }
    return { ...url, ...data };
  };
  const resetRequest = (request) => {
    let defaultValues = {
      find: "",
      filter: [],
      order: "",
      page: "",
    };
    if (defaultValues.hasOwnProperty(request)) {
      return { ...url, [request]: defaultValues[request] };
    }
  };

  return { addUrl, resetRequest };
}
