type LangMap = {
  fr: "fr";
  en: "en";
};
export type languageType = keyof LangMap;

export const routes = {
  languages: {
    fallback: "en",
    lang: {
      fr: "fr",
      en: "en",
    },
  },
  eCommerce: {
    dashboard: "/ecommerce",
    products: "/ecommerce/products",
    createProduct: "/ecommerce/products/create",
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: "/ecommerce/categories",
    createCategory: "/ecommerce/categories/create",
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: "/ecommerce/orders",
    createOrder: "/ecommerce/orders/create",
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: "/ecommerce/reviews",
    shop: "/ecommerce/shop",
    cart: "/ecommerce/cart",
    checkout: "/ecommerce/checkout",
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
  searchAndFilter: {
    realEstate: "/search/real-estate",
    nft: "/search/nft",
    flight: "/search/flight",
  },
  support: {
    dashboard: "/support",
    inbox: "/support/inbox",
    supportCategory: (category: string) => `/support/inbox/${category}`,
    messageDetails: (id: string) => `/support/inbox/${id}`,
    snippets: "/support/snippets",
    createSnippet: "/support/snippets/create",
    viewSnippet: (id: string) => `/support/snippets/${id}`,
    editSnippet: (id: string) => `/support/snippets/${id}/edit`,
    templates: "/support/templates",
    createTemplate: "/support/templates/create",
    viewTemplate: (id: string) => `/support/templates/${id}`,
    editTemplate: (id: string) => `/support/templates/${id}/edit`,
  },
  logistics: {
    dashboard: "/logistics",
    shipmentList: "/logistics/shipments",
    customerProfile: "/logistics/customer-profile",
    createShipment: "/logistics/shipments/create",
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  appointment: {
    dashboard: "/appointment",
    appointmentList: "/appointment/list",
  },
  executive: {
    dashboard: "/executive",
  },
  jobBoard: {
    dashboard: "/job-board",
    jobFeed: "/job-board/feed",
  },
  analytics: "/analytics",
  financial: {
    dashboard: "/financial",
  },
  file: {
    dashboard: "/file",
    manager: "/file-manager",
    upload: "/file-manager/upload",
    create: "/file-manager/create",
  },
  pos: {
    index: "/point-of-sale",
  },
  eventCalendar: "/event-calendar",
  rolesPermissions: "/roles-permissions",
  invoice: {
    home: "/invoice",
    create: "/invoice/create",
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
    builder: "/invoice/builder",
  },
  widgets: {
    cards: "/widgets/cards",
    icons: "/widgets/icons",
    charts: "/widgets/charts",
    maps: "/widgets/maps",
    banners: "/widgets/banners",
  },
  tables: {
    basic: "/tables/basic",
    collapsible: "/tables/collapsible",
    enhanced: "/tables/enhanced",
    pagination: "/tables/pagination",
    search: "/tables/search",
    stickyHeader: "/tables/sticky-header",
    tanTable: "/tables/tan-table",
    tanTableResizable: "/tables/tan-table-resizable",
    tanTableDnD: "/tables/tan-table-dnd",
    tanTablePinning: "/tables/tan-table-pinning",
    tanTableEnhanced: "/tables/tan-table-enhanced",
    tanTableCollapsible: "/tables/tan-table-collapsible",
  },
  multiStep: "/multi-step",
  forms: {
    profileSettings: "/forms/profile-settings",
    notificationPreference: "/forms/profile-settings/notification",
    personalInformation: "/forms/profile-settings/profile",
    newsletter: "/forms/newsletter",
  },
  emailTemplates: "/email-templates",
  welcome: "/welcome",
  comingSoon: "/coming-soon",
  accessDenied: "/access-denied",
  notFound: "/not-found",
  maintenance: "/maintenance",
  blank: "/blank",
  auth: {
    // forgot password
    // OTP
    otp1: "/auth/otp-1",
    otp2: "/auth/otp-2",
    otp3: "/auth/otp-3",
    otp4: "/auth/otp-4",
    otp5: "/auth/otp-5",
  },
  password: {
    forgotPassword: "/forgot-password",
    passwordSetting: (id: string) => `/${id}/password-setting`,
  },
  signIn: "/",
  signInError: "/",
  signUp: "/signup",
  dashboard: "/dashboard",
  profile: "/profile",
  viewprofile: "/viewprofile",
  editprofile: "/editprofile",
  registered: "/registered",
  success_registration: "/success-registration",
};

export const isRoutingWithoutLayout = (route: string) =>
  [
    routes.signIn,
    routes.signUp,
    routes.password.forgotPassword,
    routes.password.passwordSetting,
    routes.registered,
    ,
  ].includes(route) ||
  route.includes("/password-setting") ||
  route.includes(routes.success_registration);

export const protectedRoutes: string[] = [routes.dashboard];
