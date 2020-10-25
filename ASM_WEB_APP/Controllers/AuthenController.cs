using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ASM_WEB_APP.Models;

namespace ASM_WEB_APP.Controllers
{
    public class AuthenController : Controller
    {
        // GET: Authen
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(Account account)
        {
            //1.Check userName exist?
            //2.Check confirmPassword == password?
            if (ModelState.IsValid)
            {
                if (!account.Password.Equals(account.ConfirmPassword))
                {
                    ModelState.AddModelError("", "Confirm password not match!");
                    return View(account);
                }

                var userStore = new UserStore<IdentityUser>();
                var userManager = new UserManager<IdentityUser>(userStore);
                var user = new IdentityUser() { UserName = account.UserName }; /*tạo đối tượng user*/

                IdentityResult result = userManager.Create(user, account.Password); /*thêm useraccount vào bảng*/

                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", "Cannnot create user!");
                    return View(account);
                }
                return RedirectToAction("Index");
            }
            else
            {
                return View(account);
            }
        }
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Account account)
        {
            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            var user = userManager.Find(account.UserName, account.Password);

            if (user != null)
            {
                var authenticationManager = HttpContext.GetOwinContext().Authentication;
                var userIdentity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);

                authenticationManager.SignIn(new AuthenticationProperties { }, userIdentity);
                return RedirectToAction("Index", "Home");
            }
            return View(account);
        }

        public ActionResult Logout()
        {
            var authenticationManager = HttpContext.GetOwinContext().Authentication;
            authenticationManager.SignOut();
            return RedirectToAction("Login", "Authen");
        }

        public static void CreateAccount(string userName, string password, string role)
        {
            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            var user = new IdentityUser(userName);
            userManager.Create(user, password);

            userManager.AddToRole(user.Id, role);
        }

        public static void DeleteAccount(string userName)
        {
            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            userManager.Delete(FindUser(userName)); 
        }

        public static IdentityUser FindUser(string username)
        {
            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            return userManager.FindByName(username);
        }

        public static IdentityResult ChangePassword(string userName, string currentPassword, string newPassword)
        {
            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            return userManager.ChangePassword(FindUser(userName).Id, currentPassword, newPassword);
        }
    }
}