import React, {createContext, useState, useEffect} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import cafeApi from '../api/cafeApi';
import {Producto} from '../interfaces/appInterface';
import {ProductsResponse} from '../interfaces/appInterface';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; // TODO: cambiar ANY
  loadingImage: boolean;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [products]);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, resp.data]);

    return resp.data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts(
      products.map(prod => {
        return prod._id === productId ? resp.data : prod;
      }),
    );
  };

  const deleteProduct = async (id: string) => {
    try {
      await cafeApi.delete(`productos/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`productos/${id}`);
    return resp.data;
  };

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    const fileToUpload = {
      uri: data.assets[0].uri,
      type: data.assets[0].type,
      name: data.assets[0].fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    console.log(fileToUpload);

    try {
      setLoadingImage(true);
      const resp = await cafeApi.put(`/uploads/productos/${id}`, formData);
      console.log(resp);
      setLoadingImage(false);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
        loadingImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
