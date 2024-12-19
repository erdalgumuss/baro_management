export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Baro Yönetim Sistemi. Tüm hakları saklıdır.
          </p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <a href="/iletisim" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              İletişim
            </a>
            <a href="/destek" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Destek
            </a>
            <a href="/gizlilik-politikasi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Gizlilik Politikası
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

