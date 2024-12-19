const Routes = {
    home: "/",
    login: "/login",
    dashboard: {
      root: "/dashboard",
      avukat: "/dashboard/avukat-yonetimi",
      cases: "/dashboard/davalar",
      reports: "/dashboard/raporlama",
      applications: "/dashboard/basvurular",
      violations: "/dashboard/hak-ihlalleri",
    },
    avukat: {
      root: "/avukat",
      dashboard: "/avukat/dashboard",
      cases: "/avukat/davalar",
      performance: "/avukat/performans-istatistikler",
      calendar: "/avukat/takvim",
    },
    contact: "/iletisim",
  };
  
  export default Routes;
  