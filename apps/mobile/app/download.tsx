import { ThemeToggle } from '@/components/button-theme';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { IMAGE_STYLE } from '@/constants/config';
import { Stack } from 'expo-router';
import * as React from 'react';
import { Image, View } from 'react-native';

export const SCREEN_OPTIONS = {
  title: 'Meusom',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

export default function Screen() {
  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <Image
          source={require('@/assets/images/king-von.jpeg')}
          style={IMAGE_STYLE}
          resizeMode="contain"
        />
        <View className="gap-2 p-4">
          <Text
            variant="h3"
            className="ios:text-foreground text-muted-foreground text-center font-mono">
            King Von - Where I from
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Button variant="destructive" className='w-full'>
            <Text>Baixar música</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
