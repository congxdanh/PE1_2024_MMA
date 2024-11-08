import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    fetch("https://672b7a071600dda5a9f52f64.mockapi.io/api/v1/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const addToFavorites = async (product) => {
    try {
      // Lấy danh sách yêu thích từ AsyncStorage
      let favorites = await AsyncStorage.getItem("favorites");
      favorites = favorites ? JSON.parse(favorites) : [];

      // Kiểm tra nếu sản phẩm đã có trong danh sách yêu thích
      const isAlreadyFavorite = favorites.some(
        (item) => item.id === product.id
      );
      if (isAlreadyFavorite) {
        alert("This product is already in your favorites.");
        return;
      }

      // Thêm sản phẩm vào danh sách yêu thích
      favorites.push(product);
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;
  console.log("product", products);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts.sort((a, b) => a + b)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", { product: item })}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.productPrice}>Price: {item.price}</Text>
              <Text style={styles.productDeal}>
                Deal: {item.limitTimeDeal}%
              </Text>
              {item.isGift && <Text style={styles.giftLabel}>🎁 Gift</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => addToFavorites(item)}
            >
              <Text style={styles.favoriteText}>Add to Favorites ❤️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  productContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
  },
  productDeal: {
    fontSize: 16,
    color: "#28a745",
    marginBottom: 10,
  },
  giftLabel: {
    color: "#d9534f",
    fontWeight: "bold",
  },
  favoriteButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  favoriteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
