
// import { Box, Button, Center, FormControl, Input, ScrollView, Text, VStack } from "native-base";
// import React from "react";
// import Colors from "../color";

// const ShippingInputs = [
//     {
//         label: "ENTER CITY",
//         type: "text",
//     },
//     {
//         label: "ENTER COUNTRY",
//         type: "text",
//     },
//     {
//         label: "ENTER POSTAL CODE",
//         type: "text",
//     },
//     {
//         label: "ENTER ADDRESS",
//         type: "text",
//     },
// ];

// function ShippingScreen() {
//     return (
//         <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
//             {/* Header */}
//             <Center pb={15}>
//                 <Text color={Colors.white} fontSize={14} bold>
//                     DELIVERY ADDRESS
//                 </Text>
//             </Center>
//             {/* Inputs */}
//             <Box h="full" bg={Colors.white} px={5}>
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     <VStack space={6} mt={5}>
//                         {ShippingInputs.map((i, index) => (
//                             <FormControl key={index}>
//                                 <FormControl.Label
//                                     _text={{
//                                         fontSize: "12px",
//                                         fontWeight: "bold",
//                                     }}
//                                 >
//                                     {i.label}
//                                 </FormControl.Label>
//                                 <Input
//                                     borderWidth={0.2}
//                                     borderColor={Colors.main}
//                                     bg={Colors.subGreen}
//                                     py={4}
//                                     type={i.type}
//                                     color={Colors.main}
//                                     _focus={{
//                                         bg: Colors.subGreen,
//                                         borderWidth: 1,
//                                         borderColor: Colors.main,
//                                     }}
//                                 />
//                             </FormControl>
//                         ))}
//                         <Button
//                             bg={Colors.main}
//                             color={Colors.white}
//                             mt={5}
//                         >
//                             CONTINUE
//                         </Button>
//                     </VStack>
//                 </ScrollView>
//             </Box>
//         </Box>
//     );
// };
// export default ShippingScreen;

import React from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import Btn from "../Components/Btn";

const ShippingInputs = [
  {
    label: "ENTER CITY",
    type: "text",
  },
  {
    label: "ENTER COUNTRY",
    type: "text",
  },
  {
    label: "ENTER POSTAL CODE",
    type: "text",
  },
  {
    label: "ENTER ADDRESS",
    type: "text",
  },
];

function ShippingScreen() {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: Colors.main }}>
      {/* Header */}
      <View style={{ alignItems: "center", paddingBottom: 15 }}>
        <Text style={{ color: Colors.white, fontSize: 14, fontWeight: "bold" }}>
          DELIVERY ADDRESS
        </Text>
      </View>
      {/* Inputs */}
      <View style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 15 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 5 }}>
            {ShippingInputs.map((input, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>{input.label}</Text>
                <TextInput
                  style={{
                    borderWidth: 0.2,
                    borderColor: Colors.main,
                    backgroundColor: Colors.subGreen,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    color: Colors.main,
                    marginTop: 5,
                  }}
                  keyboardType={input.type}
                  underlineColorAndroid="transparent" // for Android
                />
              </View>
            ))}
              <Btn text="CONTINUE" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ShippingScreen;
