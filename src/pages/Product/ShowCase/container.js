import { hoc } from "@";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Heading, Pane } from "evergreen-ui";
import groupBy from "lodash.groupby";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCurrentReservationProduct } from "@store/slices/reservation";
import { getProductListByFilter } from "@api";

const filterNames = ["model", "location", "isAvailable", "color", "rating"];

const container = hoc((props) => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [products, setProducts] = useState([]);
  //const [groupedProducts, setGroupedProducts] = useState({});

  const fetchProductListByFilter = useCallback(async () => {
    const response = await getProductListByFilter("");
    if (response.success) setProducts(response.data);
  }, []);

  const onReservationAction = useCallback(
    (product) => {
      dispatch(setCurrentReservationProduct(product));
    },
    [dispatch]
  );

  const groupByProperties = useCallback(() => {
    if (!products.length) return;

    const names = {};
    const groups = filterNames.reduce((acc, curr) => {
      const groups = groupBy(products, curr);
      names[curr] = Object.keys(groups);
      acc[curr] = groups;
      return acc;
    }, {});
    setFilters(names);
    //setGroupedProducts(groups);
  }, [products]);

  const mappedFilters = useMemo(() => {
    return Object.keys(filters).reduce((acc, curr) => {
      const section = {
        label: curr.toLocaleUpperCase(),
        value: curr,
        disabled: true,
        category: "section",
      };
      const items = filters[curr].map((item) => ({
        label: item,
        value: item,
        category: curr,
      }));
      acc.push(section);
      return [...acc, ...items];
    }, []);
  }, [filters]);

  const onFilterSelected = useCallback(
    (item) => {
      const selected = [...selectedFilters, item.value];
      const selectedItems = selected;
      setSelectedFilters(selectedItems);
    },
    [selectedFilters, setSelectedFilters]
  );

  const onFilterDeselected = useCallback(
    (item) => {
      const deselectedItemIndex = selectedFilters.indexOf(item.value);
      const selectedItems = selectedFilters.filter(
        (_item, i) => i !== deselectedItemIndex
      );
      setSelectedFilters(selectedItems);
    },
    [selectedFilters]
  );

  const renderCustomItem = useCallback((item) => {
    return item.category === "section" ? (
      <Heading size={400}>{item.label}</Heading>
    ) : item.category === "color" ? (
      <Pane background={item.value} display="flex" flex={1} padding="0.5rem" />
    ) : item.category === "rating" ? (
      <Rating value={+item.value} disabled />
    ) : item.category === "isAvailable" ? (
      item.value === "true" ? (
        "Available"
      ) : (
        "Not Avaialable"
      )
    ) : (
      item.value
    );
  }, []);

  const filterProducts = useCallback(
    (item) =>
      filterNames
        .map((name) =>
          selectedFilters.some((selected) =>
            new RegExp("^" + selected + "$").test(item[name])
          )
        )
        .some((i) => i === true),
    [selectedFilters]
  );

  const filteredProducts = useMemo(
    () => (selectedFilters.length ? products.filter(filterProducts) : products),
    [products, filterProducts, selectedFilters]
  );

  useEffect(() => {
    groupByProperties();
  }, [products, groupByProperties]);

  useEffect(() => {
    fetchProductListByFilter();
  }, [fetchProductListByFilter]);

  return {
    ...props,
    products: filteredProducts,
    mappedFilters,
    selectedFilters,
    onFilterSelected,
    renderCustomItem,
    onFilterDeselected,
    filterProducts,
    onReservationAction,
  };
});

export default container;
