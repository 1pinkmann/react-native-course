import { Linking, StyleSheet, View } from "react-native";
import useColors from "../../../hooks/useColors";
import { useContext, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { HeaderAnimationContext } from "../contexts/HeaderAnimationContext";
import CustomPressable from '../../../components/CustomPressable';
import { AntDesign } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import HeartButton from '../../../components/HeartButton';
import { useNavigation } from "@react-navigation/native";
import AnimatedTextInput from "../../../components/AnimatedTextInput";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

function Header({ style, productsStore }) {
  const { setSearch, search } = productsStore;
  const { animatedTextInputVisible, toggleAnimatedTextInputVisible, iconsOffsetX } = useContext(HeaderAnimationContext);
  const { navigate } = useNavigation();

  function navigateToModal(route, params) {
    navigate(route, params);
  }

  function onSearchHide() {
    toggleSearchVisible();
  }

  function onContactsPress(type) {
    const actions = {
      email: 'mailto',
      phone: 'tel',
      web: 'https'
    };
    const endpoints = {
      email: 'email@icloud.com',
      phone: '123456789',
      web: 'https://google.com'
    };
    Linking.openURL(`${actions[type]}:${endpoints[type]}`);
  }

  const colors = useColors();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: iconsOffsetX.value }]
    }
  });

  return (
    <Animated.View style={[styles.header, style]}>
      {animatedTextInputVisible && <AnimatedTextInput value={search} onChangeText={setSearch} onHide={onSearchHide} placeholder="Search..." />}
      <View style={[styles.iconsWrapper, styles.iconsWrapperOverflow]}>
        <Animated.View style={[styles.iconsWrapper, animatedStyles]}>
          <CustomPressable style={styles.icon} onPress={() => navigateToModal('Settings')}>
            <AntDesign name="setting" color={colors.ICON} size={24} />
          </CustomPressable>
          <CustomPressable style={styles.icon} onPress={() => onContactsPress('email')}>
            <Fontisto name="email" color={colors.ICON} size={24} />
          </CustomPressable>
          <CustomPressable style={styles.icon} onPress={() => onContactsPress('phone')}>
            <Entypo name="phone" color={colors.ICON} size={24} />
          </CustomPressable>
          <CustomPressable style={styles.icon} onPress={() => onContactsPress('web')}>
            <MaterialCommunityIcons name="web" color={colors.ICON} size={24} />
          </CustomPressable>
          <HeartButton style={styles.icon} onPress={() => navigateToModal('WishList')} active={true} />
          <CustomPressable style={styles.icon} onPress={() => navigateToModal('Filters')}>
            <AntDesign name="filter" color={colors.ICON} size={24} />
          </CustomPressable>
        </Animated.View>
      </View>
      <CustomPressable style={styles.icon} onPress={toggleAnimatedTextInputVisible}>
        <AntDesign name="search1" color={colors.ICON} size={24} />
      </CustomPressable>
    </Animated.View>
  );
}

const getStyles = () => StyleSheet.create({
  header: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 20
  },
  icon: {
    marginLeft: 10
  },
  iconsWrapper: {
    flexDirection: 'row'
  },
  iconsWrapperOverflow: {
    overflow: 'hidden',
    flexShrink: 1,
  }
});

export default inject(({ stores }) => ({ productsStore: stores.productsStore }))(observer(Header));