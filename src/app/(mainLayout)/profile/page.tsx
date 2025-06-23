"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import PrivateRoute from "@/components/PrivateRoute";

interface UserProfile {
  fullName: string;
  email: string;
  profileImage: string;
  bio: string;
  phone: string;
  birthday: string;
  location: string;
}

const ProfilePage = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserProfile>({
    fullName: "",
    email: "",
    profileImage: "",
    bio: "",
    phone: "",
    birthday: "",
    location: "",
  });

  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/profile/me", {
          headers: {
            "auth-token": `${token}`,
          },
        });

        const data = res.data;
        console.log("Profile data:", data);

        if (data.success && data.data) {
          const profile = data.data;
          setUser({
            fullName: profile.fullName || "",
            email: profile.email || "",
            profileImage: profile.profileImage || "",
            bio: profile.bio || "",
            phone: profile.phone || "",
            birthday: profile.birthday?.substring(0, 10) || "",
            location: profile.location || "",
          });
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Unauthorized");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile/create",
        {
          fullName: user.fullName,
          email: user.email,
          bio: user.bio,
          phone: user.phone,
          birthday: user.birthday,
          location: user.location,
        },
        {
          headers: {
            "auth-token": `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      console.log("Profile response:", data);
      if (data.success) {
        toast.success(hasProfile ? "Profile updated!" : "Profile created!");
        setHasProfile(true);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <PrivateRoute>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {hasProfile ? "Edit Profile" : "Create Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src={user.profileImage || "https://i.pravatar.cc/100"}
                alt="User Avatar"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.fullName}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <Separator />

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={user.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  type="text"
                  value={user.bio}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={user.birthday}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={user.location}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-4">
                <Button type="submit">
                  {hasProfile ? "Update Profile" : "Create Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;
