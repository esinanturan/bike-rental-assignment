import { hoc } from "@";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductList, deleteProductById } from "@api";
import { setEditProduct } from "@store/slices/product";

const container = hoc((props) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const setEditProductAction = useCallback(
    (product) => {
      dispatch(setEditProduct(product));
    },
    [dispatch]
  );

  const fetchProductList = useCallback(async () => {
    setLoading(true);
    const response = await getProductList();
    setLoading(false);
    if (response.success) {
      setProducts(response.data);
    }
  }, []);

  const onDeleteConfirmed = useCallback(async (product) => {
    setLoadingDelete(true);
    const response = await deleteProductById(product.id);
    setLoadingDelete(false);

    if (response.success)
      setProducts((state) => state.filter((item) => item.id !== product.id));
  }, []);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  const filterFields = useCallback(
    (product) => {
      const regExp = new RegExp(search, "ig");
      return (
        regExp.test(product.model) ||
        regExp.test(product.color) ||
        regExp.test(product.isAvailable === 1 ? "available" : "not available")
      );
    },
    [search]
  );

  const replaceField = useCallback(
    (field) =>
      field === true
        ? { badge: "green", availabilty: "Available" }
        : { badge: "red", availabilty: "Not Available" },
    []
  );

  const filteredProducts = useMemo(
    () => products.filter((product) => filterFields(product)),
    [filterFields, products]
  );

  return {
    ...props,
    products: filteredProducts,
    search,
    loading,
    loadingDelete,
    setSearch,
    replaceField,
    filterFields,
    setEditProductAction,
    onDeleteConfirmed,
  };
});

export default container;
