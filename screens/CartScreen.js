import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator
} from "react-native";
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CartScreen = () => {
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const { pickUpDate, time, delivery } = route.params;
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const user = auth.currentUser;
  const userUid = user ? user.uid : null;
  const dispatch = useDispatch();
  const placeOrder = async () => {

    setLoading(true);
    
    try {
      const docRef = await addDoc(
        collection(db, "users"),
        {
          orders: { ...cart },
          pickUpDetails: route.params,
        },
        {
          merge: true,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    navigation.navigate("Order");
    dispatch(cleanCart());
    setLoading(false);

    
  };
  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
              <Text>Your Bucket</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 12,
                  }}
                  key={index}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                    {item.name}
                  </Text>

                  {/* - + button */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#088F8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    ${total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.pickUpDate}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Grand Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    ${total}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                marginVertical: 20,
                marginHorizontal: 10,
                borderRadius: 10,
                backgroundColor: "#088F8F",
              }}
            >
              <Pressable
                onPress={placeOrder}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 14,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                >
                  {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Place Order</Text>
              )}
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
