using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

[assembly: OwinStartup(typeof(ASM_WEB_APP.Startup))]

namespace ASM_WEB_APP
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Authen/Login")
            });

            CreateUserRoles();
        }

        private void CreateUserRoles()
        {
            var userStore = new UserStore<IdentityUser>();
            var userManager = new UserManager<IdentityUser>(userStore);

            var roleStore = new RoleStore<IdentityRole>();
            var roleManager = new RoleManager<IdentityRole>(roleStore);

            if (!roleManager.RoleExists("Admin"))
            {
                var role = new IdentityRole("Admin");
                roleManager.Create(role);

                var user = new IdentityUser("Admin");
                var result = userManager.Create(user, "123456");

                if (result.Succeeded)
                {
                    userManager.AddToRole(user.Id, "Admin");
                }
            }

            if (!roleManager.RoleExists("Trainee"))
            {
                var role = new IdentityRole("Trainee");
                roleManager.Create(role);
            }

            if (!roleManager.RoleExists("Trainer"))
            {
                var role = new IdentityRole("Trainer");
                roleManager.Create(role);
            }
            if (!roleManager.RoleExists("Staff"))
            {
                var role = new IdentityRole("Staff");
                roleManager.Create(role);
            }
        }
    }
}
