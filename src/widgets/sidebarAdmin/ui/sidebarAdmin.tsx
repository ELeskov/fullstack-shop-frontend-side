import { Link, useLocation, useNavigate } from 'react-router'

import {
  ChevronsUpDown,
  LogOut,
  Settings,
  Shield,
  UserRoundX,
} from 'lucide-react'

import { useGetMe, useLogoutMutation } from '@/shared/api'
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/shared/ui/components/ui/sidebar'
import { UserAvatar } from '@/shared/ui/userAvatar'

import { adminNavData } from '../lib'

export function SidebarAdmin() {
  const { data: user } = useGetMe()
  const { mutateAsync: logout, isPending: isLogoutPending } =
    useLogoutMutation()
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isRouteActive = (url: string) => {
    if (url === ROUTES.admin.users) {
      return pathname === ROUTES.admin.root || pathname === ROUTES.admin.users
    }

    return pathname === url
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Sidebar className="absolute h-[calc(100dvh-80px)]" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <UserAvatar imagePath={user?.picture ?? ''} />
              <span className="line-clamp-1 font-medium">SuperAdmin</span>
              <Shield className="ml-auto size-4 text-amber-300" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Админ-панель</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavData.map(item => (
                <Link key={item.title} to={item.url} tabIndex={-1}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isRouteActive(item.url)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
