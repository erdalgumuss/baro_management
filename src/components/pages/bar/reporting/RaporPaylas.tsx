import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function RaporPaylas() {
  const [email, setEmail] = useState('')
  const [link, setLink] = useState('')

  const handleShare = () => {
    // Implement sharing logic here
    console.log('Sharing report to:', email)
  }

  const handleGenerateLink = () => {
    // Implement link generation logic here
    const generatedLink = `https://baro-app.com/rapor/${Math.random().toString(36).substr(2, 9)}`
    setLink(generatedLink)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Raporu Paylaş</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle>Raporu Paylaş</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-posta
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3 bg-gray-700 text-gray-100"
            />
          </div>
          <Button onClick={handleShare}>E-posta ile Paylaş</Button>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              value={link}
              readOnly
              className="col-span-3 bg-gray-700 text-gray-100"
            />
          </div>
          <Button onClick={handleGenerateLink}>Link Oluştur</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

