'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CompleteUserRegistrationModal from "@/components/pages/index/CompleteUserRegistrationModal";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tcNumber, setTcNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showCompleteRegistrationModal, setShowCompleteRegistrationModal] = useState(false);
  const router = useRouter();

  const { handleLogin, loading, error } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { needsRegistration, role } = await handleLogin(tcNumber, password);

    if (needsRegistration) {
      setShowCompleteRegistrationModal(true);
     if (role === "lawyer") {
      router.push("/lawyer");
    } else if (role === "admin") {
      router.push("/bar");
    }
  }
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Giriş Yap</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Giriş Yap</DialogTitle>
            <DialogDescription>
              TC Kimlik Numarası ve Şifrenizi girerek giriş yapın.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="tcNumber">TC Kimlik Numarası</Label>
              <Input
                id="tcNumber"
                value={tcNumber}
                onChange={(e) => setTcNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </DialogContent>
      </Dialog>
      {showCompleteRegistrationModal && (
        <CompleteUserRegistrationModal
          isOpen={showCompleteRegistrationModal}
          onClose={() => setShowCompleteRegistrationModal(false)}
          tcNumber={tcNumber}
        />
      )}
    </>
  );
}
