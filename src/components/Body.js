import ResturantCard from "./ResturantCard";
import { RESTURANT_API_URL } from "../../constant";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

//filter Data accoring to Search Text

function filterData(searchText, restaurantList) {
  const filterData = restaurantList.filter((resturant) => {
    return resturant?.data?.name
      .toLowerCase()
      ?.includes(searchText.toLowerCase());
  });
  return filterData;
}
const Body = () => {
  const [allRestaurantList, setAllRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterRestaurantList, setFilterRestaurantList] = useState([]);

  useEffect(() => {
    getRestaurant();
  }, []);

  //API CALL OF SWIGGY
  async function getRestaurant() {
    const response = await fetch(RESTURANT_API_URL);
    const json = await response.json();
    setFilterRestaurantList(json?.data?.cards[2]?.data?.data?.cards);
    setAllRestaurantList(json?.data?.cards[2]?.data?.data?.cards);
  }
  //CONDITIONAL RENDERING
  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (searchText.length <= 1) {
              getResturant();
            }
            const data = filterData(searchText, allRestaurantList);
            setFilterRestaurantList(data);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            const data = filterData(searchText, allRestaurantList);
            setFilterRestaurantList(data);
          }}
        >
          Search
        </button>
      </div>
      {allRestaurantList.length > 0 ? (
        <div className="resturantList">
          {filterRestaurantList.length > 0 ? (
            filterRestaurantList?.map((resturant) => {
              console.log(resturant?.data);
              return (
                <Link to={"/" + resturant?.data?.id}>
                  <ResturantCard
                    {...resturant?.data}
                    key={resturant?.data?.id}
                  />
                </Link>
              );
            })
          ) : (
            <h1>Resturant you are trying to search is not available!</h1>
          )}
        </div>
      ) : (
        <Shimmer />
      )}
    </>
  );
};

export default Body;
