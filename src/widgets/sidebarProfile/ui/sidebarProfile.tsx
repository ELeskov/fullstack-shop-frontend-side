import { Link, useNavigate } from 'react-router'

import {
  BadgePlus,
  Check,
  ChevronsUpDown,
  Ellipsis,
  LogOut,
  Plus,
  Settings,
  ShieldCheck,
  UserRoundX,
} from 'lucide-react'

import {
  useGetMe,
  useGetMeShops,
  useLogoutMutation,
  useSelectedShopId,
} from '@/shared/api'
import { ROUTES } from '@/shared/config'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
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
  const { data: user } = useGetMe()
  const { data: shops } = useGetMeShops()
  const { selectedShopId, setSelectedShopId } = useSelectedShopId()
  const { mutateAsync: logout, isPending: isLogoutPending } =
    useLogoutMutation()
  const { isMobile } = useSidebar()
  const navigate = useNavigate()

  const selectedShop =
    shops?.find(shop => shop.id === selectedShopId) ?? shops?.[0] ?? null
  const isAdmin = user?.role === 'ADMIN'

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Sidebar
      className="relative h-[calc(100dvh-80px)] max-h-[calc(100dvh-80px)] overflow-hidden"
      collapsible="icon"
    >
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-3"
            >
              <UserAvatar imagePath={selectedShop?.picture ?? ''} />
              <span className="line-clamp-1 font-medium">
                {selectedShop?.title ?? 'Магазин не выбран'}
              </span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
          >
            {shops?.length ? (
              shops.map(shop => (
                <DropdownMenuItem
                  key={shop.id}
                  onSelect={() => setSelectedShopId(shop.id)}
                >
                  <div className="flex items-center gap-5 line-clamp-1">
                    <UserAvatar imagePath={shop.picture ?? ''} />
                    <span className="text-base">{shop.title}</span>
                  </div>

                  {shop.id === selectedShop?.id && (
                    <Check className="ml-auto" />
                  )}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                У вас пока нет магазинов
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-5"
              onSelect={() => navigate(ROUTES.profile.shops.create)}
            >
              <Plus className="size-5" />
              <span>Создать магазин</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent>
        {isAdmin ? (
          <SidebarGroup>
            <SidebarGroupLabel>Платформа</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Link to={ROUTES.admin.root} tabIndex={-1}>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Админ-панель">
                      <ShieldCheck />
                      <span>Админ-панель</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}

        {profileNavData.navMain.map(group => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <Link key={item.title} to={item.url} tabIndex={-1}>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.isCreated && item.createPath && (
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
                  <UserAvatar imagePath={user?.picture ?? ''} />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.name ?? 'Пользователь'}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email ?? 'Нет почты'}
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
                      <AvatarImage src={user?.picture ?? ''} />
                      <AvatarFallback className="rounded-lg">
                        <UserRoundX size={20} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.name ?? 'Пользователь'}
                      </span>
                      <span className="truncate text-xs">
                        {user?.email ?? 'Нет почты'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => navigate(ROUTES.profile.root)}
                  className="gap-2"
                >
                  <Settings size={16} />
                  <span>Настройки аккаунта</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={handleLogout}
                  disabled={isLogoutPending}
                  className="gap-2"
                >
                  <LogOut />
                  <span>{isLogoutPending ? 'Выход...' : 'Выйти'}</span>
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
