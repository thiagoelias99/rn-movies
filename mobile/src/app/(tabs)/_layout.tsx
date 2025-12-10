import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"
import { images } from "@/constants/images"
import { icons } from "@/constants/icons"

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {

  if (focused)
    return (
      <View>
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
          <Image
            source={icon}
            tintColor="#151312"
            className="size-5"
          />
          <Text
            className="text-secondary text-base font-semibold ml-2"
          >{title}</Text>
        </ImageBackground>
      </View>
    )

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image
        source={icon}
        tintColor="#A8B5DB"
        className="size-5"
      />
    </View>
  )
}

export default function Profile() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f0D23',
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 8,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0D23'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title="Início" />
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Busca',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.search}
              title="Busca" />
          )
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Salvos',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.save}
              title="Salvos" />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.person}
              title="Perfil" />
          )
        }}
      />
    </Tabs>
  )
}