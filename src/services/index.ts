
// core services
import { HttpService } from './api-services/http.service';
import { EnvironmentService } from "./environment/environment.service";
import { TabNavService } from "./tab-nav.service";

// api services
import { OrderApiService } from './api-services/order.api.service';
import { CartApiService } from './api-services/cart-api.service';
import { FavApiService } from './api-services/fav-api.service';
import { ProductApiService } from './api-services/product-api.service';
import { UserApiService } from "./api-services/user-api/user-api.service";

// auth services
import { AgentAuthService } from './auth/agent-auth.service';
import { CustomAuthStrategyService } from './auth/custom-auth/custom-auth.service';
import { FacebookAuthStrategyService } from './auth/facebook-auth/facebook-auth.service';
import { GoogleAuthStrategyService } from './auth/google-auth/google-auth.service';

// local data services
import { CartService } from './local-services/cart.service';
import { FavService } from './local-services/fav.service';
import { ProductService } from './local-services/product.service';



export const servicesArray: any[] = [
    EnvironmentService,
    TabNavService,
    UserApiService,
    GoogleAuthStrategyService,
    FacebookAuthStrategyService,
    CustomAuthStrategyService,
    AgentAuthService,
    HttpService,
    ProductApiService,
    FavApiService,
    CartApiService,
    OrderApiService,
    ProductService,
    CartService,
    FavService,
];

// core services
export { HttpService } from './api-services/http.service';
export { EnvironmentService } from "./environment/environment.service";
export { TabNavService } from "./tab-nav.service";

// api services
export { CartApiService } from './api-services/cart-api.service';
export { FavApiService } from './api-services/fav-api.service';
export { ProductApiService } from './api-services/product-api.service';
export { UserApiService } from "./api-services/user-api/user-api.service";
export { OrderApiService } from './api-services/order.api.service';

// auth services
export { AgentAuthService } from './auth/agent-auth.service';
export { CustomAuthStrategyService } from './auth/custom-auth/custom-auth.service';
export { FacebookAuthStrategyService } from './auth/facebook-auth/facebook-auth.service';
export { GoogleAuthStrategyService } from './auth/google-auth/google-auth.service';

// local data services
export { CartService } from './local-services/cart.service';
export { FavService } from './local-services/fav.service';
export { ProductService } from './local-services/product.service';