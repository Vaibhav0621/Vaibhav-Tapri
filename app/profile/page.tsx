"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, BookOpen, Plus, Eye, Pencil } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { TapriService } from "@/lib/services/tapri-service"
import { UserService } from "@/lib/services/user-service"

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [userTapris, setUserTapris] = useState([])
  const [userApplications, setUserApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    bio: profile?.bio || "",
  })

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || "",
        email: profile.email || "",
        bio: profile.bio || "",
      })
      loadUserData()
    }
  }, [profile])

  const loadUserData = async () => {
    if (!user) return

    try {
      const [tapris, applications] = await Promise.all([
        TapriService.getUserTapris(user.id),
        UserService.getUserApplications(user.id),
      ])

      setUserTapris(tapris)
      setUserApplications(applications)
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateProfile({
        full_name: profileData.full_name,
        bio: profileData.bio,
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-background dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex flex-col items-center text-center md:text-left md:items-start">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || "User"} />
                  <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                {!isEditing ? (
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">{profile?.full_name || "User"}</h1>
                    <p className="text-muted-foreground">{profile?.email}</p>
                    <p className="max-w-md">{profile?.bio || "No bio added yet."}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since {formatDate(profile?.created_at || "")}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={3} />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="my-tapris" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="my-tapris">My Tapris</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="my-tapris" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Tapris</h2>
                  <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Link href="/create-project">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Tapri
                    </Link>
                  </Button>
                </div>

                {userTapris.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">You haven't created any tapris yet</p>
                      <Button asChild className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Link href="/create-project">Create Your First Tapri</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userTapris.map((tapri: any) => (
                      <Card key={tapri.id} className="overflow-hidden">
                        <div className="aspect-[16/9] relative">
                          <Image
                            src={tapri.banner_url || "/placeholder.svg?height=300&width=600"}
                            alt={tapri.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={
                                tapri.status === "approved"
                                  ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                                  : tapri.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300"
                                    : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                              }
                            >
                              {tapri.status === "approved"
                                ? "Published"
                                : tapri.status === "pending"
                                  ? "Pending"
                                  : "Draft"}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-2">{tapri.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{tapri.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-4">Created: {formatDate(tapri.created_at)}</span>
                            {tapri.status === "approved" && (
                              <>
                                <span className="mr-4">{tapri.views || 0} views</span>
                                <span>{tapri.applications || 0} applications</span>
                              </>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0 flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/tapris/${tapri.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              {tapri.status === "approved" ? "View" : "Preview"}
                            </Link>
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black"
                            asChild
                          >
                            <Link href={`/tapris/${tapri.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <h2 className="text-2xl font-bold">My Applications</h2>

                {userApplications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">You haven't applied to any tapris yet</p>
                      <Button asChild className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Link href="/tapris">Explore Tapris</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userApplications.map((application: any) => (
                      <Card key={application.id} className="overflow-hidden">
                        <div className="aspect-[16/9] relative">
                          <Image
                            src={application.tapris?.banner_url || "/placeholder.svg?height=300&width=600"}
                            alt={application.tapris?.title || "Tapri"}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={
                                application.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : application.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {application.status}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-2">{application.tapris?.title}</h3>
                          {/* Removed the reference to open_positions that was causing the error */}
                          <p className="text-sm text-muted-foreground mb-2">
                            Position: {application.position_title || "Not specified"}
                          </p>
                          <p className="text-xs text-muted-foreground">Applied: {formatDate(application.created_at)}</p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={`/tapris/${application.tapri_id}`}>View Tapri</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold">Account Settings</h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your account details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <p className="text-sm text-muted-foreground">{profile?.email}</p>
                      </div>
                      <div>
                        <Label>Member Since</Label>
                        <p className="text-sm text-muted-foreground">{formatDate(profile?.created_at || "")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions for your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
