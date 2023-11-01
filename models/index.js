const controller = require('../controllers/index')
const router = express.Router();

router.get("/", controller.home);

router.post("/login", controller.login)