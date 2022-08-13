import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { find } from "../../redux/acctions/actions.js";
import useUrl from "../../hooks/useUrl";
import style from "../../style/home/search.module.css";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";

export default function Search() {
  let [search, setSearch] = useState({
    find: "",
  });

  let dispatch = useDispatch();
  let { url, page } = useSelector((state) => state);
  let { addUrl, resetRequest } = useUrl(url);

  useEffect(()=>{
    let previusSearch = localStorage.getItem("search");
    if(previusSearch){
       setSearch({ find: previusSearch });
       url = addUrl({ find: previusSearch });
       url = addUrl({ page: page });
       dispatch(find(url,page));
    }
  },[])

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    if(!e.target.value){
      url = resetRequest("find");
      dispatch(find(url));
      localStorage.removeItem("search");
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.find) {
      url = addUrl(search);
      dispatch(find(url));
      localStorage.setItem("search",search.find);
     }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.search_conteiner}>
        <input
          type="text"
          placeholder="Search name"
          name="find"
          value={search.find}
          onChange={handleChange}
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
          className={style.search_btn}
        >
          <IconContext.Provider value={{ className: style.search_btn_icon }}>
            <BiSearch />
          </IconContext.Provider>
        </button>
      </form>
    </>
  );
}
