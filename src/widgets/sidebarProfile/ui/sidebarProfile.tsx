import { useState } from 'react'
import { Link } from 'react-router'

import {
  BadgePlus,
  Check,
  ChevronsUpDown,
  Ellipsis,
  LogOut,
  Plus,
  Sparkles,
  UserRoundX,
} from 'lucide-react'

import userAvatar from '@/shared/assets/icons/favicon-bg-white.svg'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import { Label } from '@/shared/ui/components/ui/label'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/shared/ui/components/ui/sidebar'
import { UserAvatar } from '@/shared/ui/userAvatar'

import { profileNavData } from '../lib'

export function SidebarProfile() {
  const [selectedVersion, setSelectedVersion] = useState(
    profileNavData.shops[0],
  )
  const { isMobile } = useSidebar()

  return (
    <Sidebar className="absolute h-[calc(100dvh-80px)]" collapsible="icon">
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-3"
            >
              <UserAvatar imagePath={selectedVersion.shopImage} />
              <span className="font-medium line-clamp-1">
                {selectedVersion.title}
              </span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
          >
            {profileNavData.shops.map((shop) => (
              <DropdownMenuItem
                key={shop.title}
                onSelect={() => setSelectedVersion(shop)}
              >
                <div className="flex items-center gap-5 line-clamp-1">
                  <UserAvatar imagePath={shop.shopImage} />
                  <span className="text-base ">{shop.title}</span>
                </div>

                {shop.title === selectedVersion.title && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-5">
              <Plus className="size-5 " />
              <Label className="text-base flex-1">Создать магазин</Label>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        {profileNavData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <Link key={item.title} to={item.url} tabIndex={-1}>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.isCreated && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuAction
                              showOnHover
                              className="data-[state=open]:bg-accent rounded-sm"
                            >
                              <Ellipsis />
                              <span className="sr-only">More</span>
                            </SidebarMenuAction>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="w-24 rounded-lg"
                            side={isMobile ? 'bottom' : 'right'}
                            align={isMobile ? 'end' : 'start'}
                          >
                            <Link to={item.createPath}>
                              <DropdownMenuItem className="hover:text-green-400!">
                                <BadgePlus />
                                <span>Создать</span>
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </SidebarMenuItem>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UserAvatar imagePath={userAvatar} />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Egor</span>
                    <span className="truncate text-xs">
                      leskovegor490@gmail.com
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={userAvatar} />
                      <AvatarFallback className="rounded-lg">
                        <UserRoundX size={20} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Egor</span>
                      <span className="truncate text-xs">
                        leskovegor490@gmail.com
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Обновить до Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
