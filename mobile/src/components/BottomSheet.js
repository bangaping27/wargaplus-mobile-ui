import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated, Dimensions, PanResponder } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Overlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.overlay};
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

const BottomSheetContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.card};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.xl}px;
  shadow-color: ${({ theme }) => theme.colors.shadow.dark};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.25;
  shadow-radius: 16px;
  elevation: 12;
  z-index: ${({ theme }) => theme.zIndex.modal};
  max-height: ${({ theme }) => SCREEN_HEIGHT * 0.8}px;
`;

const Handle = styled.View`
  align-self: center;
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border.medium};
  border-radius: 2px;
  margin: ${({ theme }) => theme.spacing[2]}px 0;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]}px;
`;

const BottomSheet = ({ isVisible, onClose, children }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SCREEN_HEIGHT * 0.3) {
          closeSheet();
        } else {
          openSheet();
        }
      },
    })
  ).current;

  const openSheet = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: false,
      tension: 65,
      friction: 8,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (isVisible) {
      openSheet();
    } else {
      closeSheet();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <Overlay onPress={closeSheet} activeOpacity={1} />
      <BottomSheetContainer
        style={{
          transform: [{ translateY }],
        }}
        {...panResponder.panHandlers}
      >
        <Handle />
        <Content showsVerticalScrollIndicator={false}>
          {children}
        </Content>
      </BottomSheetContainer>
    </>
  );
};

export default BottomSheet;