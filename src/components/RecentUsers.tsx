// RecentUsers is disabled because the dashboard uses UserTable directly.
// The previous implementation is preserved below as comments.
// import Link from "next/link";
// 
// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar";
// 
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// 
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// 
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// 
// import UserActions from "@/components/UserActions";
// 
// import { getUsers } from "@/lib/users";
// 
// export default async function RecentUsers() {
//   const users = await getUsers();
// 
//   const recentUsers = users.slice(0, 5);
// 
//   return (
//     <Card className="overflow-hidden border-border/70 shadow-sm">
//       {/* Header */}
//       <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
//         <div>
//           <CardTitle className="text-base font-semibold">
//             Recent Users
//           </CardTitle>
// 
//           <CardDescription className="mt-1">
//             Recently registered users across your workspace.
//           </CardDescription>
//         </div>
// 
//         <Button
//           variant="outline"
//           size="sm"
//           className="hidden sm:inline-flex"
//           nativeButton={false}
//           render={
//             <Link href="/dashboard/users" />
//           }
//         >
//           View all
//         </Button>
//       </CardHeader>
// 
//       <CardContent className="p-0">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow className="border-border/70 bg-muted/20 hover:bg-muted/20">
//                 <TableHead className="h-11 min-w-52 pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                   User
//                 </TableHead>
// 
//                 <TableHead className="hidden min-w-56 text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
//                   Email
//                 </TableHead>
// 
//                 <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                   Role
//                 </TableHead>
// 
//                 <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                   Status
//                 </TableHead>
// 
//                 <TableHead className="w-16 pr-6 text-right">
//                   <span className="sr-only">
//                     Actions
//                   </span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
// 
//             <TableBody>
//               {recentUsers.length > 0 ? (
//                 recentUsers.map((user) => {
//                   const isActive =
//                     user.status.toLowerCase() === "active";
// 
//                   return (
//                     <TableRow
//                       key={user.id}
//                       className="
//                         group
//                         h-17
//                         border-border/60
//                         transition-colors
//                         hover:bg-muted/25
//                       "
//                     >
//                       {/* User */}
//                       <TableCell className="pl-6">
//                         <div className="flex items-center gap-3">
//                           <div className="relative shrink-0">
//                             <Avatar className="size-9 border border-border shadow-sm">
//                               <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
//                                 {getInitials(user.name)}
//                               </AvatarFallback>
//                             </Avatar>
// 
//                             <span
//                               className={`
//                                 absolute bottom-0 right-0 size-2.5 rounded-full
//                                 border-2 border-card
//                                 ${
//                                   isActive
//                                     ? "bg-emerald-500"
//                                     : "bg-muted-foreground"
//                                 }
//                               `}
//                             />
//                           </div>
// 
//                           <div className="min-w-0">
//                             <Link
//                               href={`/dashboard/users/${user.id}`}
//                               className="
//                                 block truncate
//                                 text-sm font-medium
//                                 transition-colors
//                                 hover:text-primary
//                               "
//                             >
//                               {user.name}
//                             </Link>
// 
//                             <p className="mt-0.5 truncate text-xs text-muted-foreground md:hidden">
//                               {user.email}
//                             </p>
// 
//                             <p className="mt-0.5 hidden text-[11px] text-muted-foreground md:block">
//                               ID #
//                               {String(user.id).padStart(
//                                 4,
//                                 "0",
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                       </TableCell>
// 
//                       {/* Email */}
//                       <TableCell className="hidden md:table-cell">
//                         <p className="max-w-56 truncate text-sm text-muted-foreground">
//                           {user.email}
//                         </p>
//                       </TableCell>
// 
//                       {/* Role */}
//                       <TableCell>
//                         <RoleBadge
//                           role={user.role}
//                         />
//                       </TableCell>
// 
//                       {/* Status */}
//                       <TableCell>
//                         <StatusBadge
//                           status={user.status}
//                         />
//                       </TableCell>
// 
//                       {/* Actions */}
//                       <TableCell className="pr-6 text-right">
//                         <UserActions
//                           user={user}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={5}
//                     className="h-36 text-center"
//                   >
//                     <div className="flex flex-col items-center">
//                       <p className="text-sm font-medium">
//                         No users yet
//                       </p>
// 
//                       <p className="mt-1 text-xs text-muted-foreground">
//                         Recently created users will appear here.
//                       </p>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
// 
//         {/* Mobile Footer */}
//         <div className="flex items-center justify-between border-t border-border/60 px-6 py-4 sm:hidden">
//           <p className="text-xs text-muted-foreground">
//             Showing{" "}
//             <span className="font-medium text-foreground">
//               {recentUsers.length}
//             </span>{" "}
//             recent users
//           </p>
// 
//           <Button
//             variant="outline"
//             size="sm"
//             nativeButton={false}
//             render={
//               <Link href="/dashboard/users" />
//             }
//           >
//             View all
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
// 
// function RoleBadge({
//   role,
// }: {
//   role: string;
// }) {
//   const normalizedRole =
//     role.toLowerCase();
// 
//   if (normalizedRole === "admin") {
//     return (
//       <Badge
//         variant="outline"
//         className="
//           border-violet-500/20
//           bg-violet-500/10
//           px-2.5
//           py-1
//           text-violet-500
//         "
//       >
//         Admin
//       </Badge>
//     );
//   }
// 
//   if (
//     normalizedRole === "manager"
//   ) {
//     return (
//       <Badge
//         variant="outline"
//         className="
//           border-blue-500/20
//           bg-blue-500/10
//           px-2.5
//           py-1
//           text-blue-500
//         "
//       >
//         Manager
//       </Badge>
//     );
//   }
// 
//   return (
//     <Badge
//       variant="outline"
//       className="
//         border-border
//         bg-muted/50
//         px-2.5
//         py-1
//         text-muted-foreground
//       "
//     >
//       {capitalize(role)}
//     </Badge>
//   );
// }
// 
// function StatusBadge({
//   status,
// }: {
//   status: string;
// }) {
//   const normalizedStatus =
//     status.toLowerCase();
// 
//   if (normalizedStatus === "active") {
//     return (
//       <Badge
//         variant="outline"
//         className="
//           gap-1.5
//           border-emerald-500/20
//           bg-emerald-500/10
//           px-2.5
//           py-1
//           text-emerald-500
//         "
//       >
//         <span className="size-1.5 rounded-full bg-emerald-500" />
// 
//         Active
//       </Badge>
//     );
//   }
// 
//   if (normalizedStatus === "pending") {
//     return (
//       <Badge
//         variant="outline"
//         className="
//           gap-1.5
//           border-amber-500/20
//           bg-amber-500/10
//           px-2.5
//           py-1
//           text-amber-500
//         "
//       >
//         <span className="size-1.5 rounded-full bg-amber-500" />
// 
//         Pending
//       </Badge>
//     );
//   }
// 
//   return (
//     <Badge
//       variant="outline"
//       className="
//         gap-1.5
//         border-border
//         bg-muted
//         px-2.5
//         py-1
//         text-muted-foreground
//       "
//     >
//       <span className="size-1.5 rounded-full bg-muted-foreground" />
// 
//       {capitalize(status)}
//     </Badge>
//   );
// }
// 
// function getInitials(
//   name: string,
// ) {
//   return name
//     .trim()
//     .split(/\s+/)
//     .map((part) => part[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }
// 
// function capitalize(
//   value: string,
// ) {
//   if (!value) {
//     return "";
//   }
// 
//   return (
//     value.charAt(0).toUpperCase() +
//     value.slice(1)
//   );
// }
import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import UserActions from "@/components/UserActions";

import { getUsers } from "@/lib/data";

export default async function RecentUsers() {
  const users =
    await getUsers();

  const recentUsers =
    users.slice(0, 5);

  return (
    <Card data-scroll-reveal="card" className="overflow-hidden border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <div>
          <CardTitle className="text-base font-semibold">
            Recent Users
          </CardTitle>

          <CardDescription className="mt-1">
            Recently registered users
            across your workspace.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={
            <Link href="/dashboard/users" />
          }
        >
          View all
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="pl-6">
                  User
                </TableHead>

                <TableHead>
                  Role
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead className="w-16 pr-6 text-right">
                  <span className="sr-only">
                    Actions
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentUsers.length >
              0 ? (
                recentUsers.map(
                  (user) => {
                    const active =
                      user.status.toLowerCase() ===
                      "active";

                    return (
                      <TableRow
                        key={
                          user.id
                        }
                        className="group h-16"
                      >
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="size-9 border">
                                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                  {getInitials(
                                    user.name,
                                  )}
                                </AvatarFallback>
                              </Avatar>

                              <span
                                className={`
                                  absolute
                                  bottom-0
                                  right-0
                                  size-2.5
                                  rounded-full
                                  border-2
                                  border-card
                                  ${
                                    active
                                      ? "bg-emerald-500"
                                      : "bg-muted-foreground"
                                  }
                                `}
                              />
                            </div>

                            <div className="min-w-0">
                              <Link
                                href={`/dashboard/users/${user.id}`}
                                className="block max-w-40 truncate text-sm font-medium transition-colors hover:text-primary"
                              >
                                {
                                  user.name
                                }
                              </Link>

                              <p className="mt-0.5 max-w-40 truncate text-[11px] text-muted-foreground">
                                {
                                  user.email
                                }
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className="font-normal"
                          >
                            {
                              user.role
                            }
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              active
                                ? "gap-1.5 border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                                : "gap-1.5 bg-muted text-muted-foreground"
                            }
                          >
                            <span
                              className={
                                active
                                  ? "size-1.5 rounded-full bg-emerald-500"
                                  : "size-1.5 rounded-full bg-muted-foreground"
                              }
                            />

                            {
                              user.status
                            }
                          </Badge>
                        </TableCell>

                        <TableCell className="pr-6 text-right">
                          {/* <UserActions
                            user={
                              user
                            }
                          /> */}
                        </TableCell>
                      </TableRow>
                    );
                  },
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function getInitials(
  name: string,
) {
  return name
    .trim()
    .split(/\s+/)
    .map(
      (part) =>
        part[0],
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
