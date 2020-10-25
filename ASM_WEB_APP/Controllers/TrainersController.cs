using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ASM_WEB_APP.Models;

namespace ASM_WEB_APP.Controllers
{
    [Authorize]
    public class TrainersController : Controller
    {
        private AsmWebAppDBEntities db = new AsmWebAppDBEntities();

        // GET: Trainers
        public ActionResult Index(string sortOrder, string SearchTrainer)
        {
            ViewBag.TrainerSortParm = String.IsNullOrEmpty(sortOrder) ? "trainer_desc" : "";

            var trainers = from s in db.Trainers select s;
            if (!String.IsNullOrEmpty(SearchTrainer))
            {
                trainers = trainers.Where(s => (s.LastName + " " + s.FirstName).Contains(SearchTrainer));
            }

            switch (sortOrder)
            {
                case "trainer_desc":
                    trainers = trainers.OrderByDescending(s => s.FirstName);
                    break;
                default:
                    trainers = trainers.OrderBy(s => s.FirstName);
                    break;
            }
            return View(trainers);
        }

        // GET: Trainers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                foreach (var item in db.Trainers.ToList())
                {
                    if (item.UserName==User.Identity.Name)
                    {
                        id = item.TrainerID;
                    }
                }
            }
            Trainer trainer = db.Trainers.Find(id);
            if (trainer == null)
            {
                return HttpNotFound();
            }

            ViewBag.CourseTopics = db.CourseTopics.Where(x => x.TrainerID == id).ToList();

            return View(trainer);
        }

        // GET: Trainers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Trainers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "TrainerID,LastName,FirstName,UserName,Address")] Trainer trainer)
        {
            if (ModelState.IsValid)
            {
                db.Trainers.Add(trainer);
                db.SaveChanges();

                AuthenController.CreateAccount(trainer.UserName, "123456", "Trainer");

                return RedirectToAction("Index");
            }

            return View(trainer);
        }

        // GET: Trainers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Trainer trainer = db.Trainers.Find(id);
            if (trainer == null)
            {
                return HttpNotFound();
            }
            return View(trainer);
        }

        // POST: Trainers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "TrainerID,LastName,FirstName,UserName,Address")] Trainer trainer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(trainer).State = EntityState.Modified;
                db.SaveChanges();


                return RedirectToAction("Details/" + trainer.TrainerID.ToString(), "Trainers");
            }
            return View(trainer);
        }

        // GET: Trainers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Trainer trainer = db.Trainers.Find(id);
            ViewBag.Mess = false;
            if (trainer == null)
            {
                return HttpNotFound();
            }
            return View(trainer);
        }

        // POST: Trainers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            if(db.CourseTopics.Where(c => c.TrainerID == id).ToList().Count != 0)
            {
                ViewBag.Mess = true;
                return View(db.Trainers.Find(id));
            }
            Trainer trainer = db.Trainers.Find(id);
            db.Trainers.Remove(trainer);
            db.SaveChanges();
            AuthenController.DeleteAccount(trainer.UserName);
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public ActionResult ChangePassword(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Trainer trainer = db.Trainers.Find(id);
            if (trainer == null)
            {
                return HttpNotFound();
            }
            return View(trainer);
        }

        [HttpPost]
        public ActionResult ChangePassword(int trainerID, string userName, string currentPassword, string newPassword)
        {
            if (!AuthenController.ChangePassword(userName, currentPassword, newPassword).Succeeded)
            {
                ModelState.AddModelError("", "Can't change password. Something's wrong.");
                Trainer trainer = db.Trainers.Find(trainerID);
                return View(trainer);
            }
            return RedirectToAction("Details/" + trainerID.ToString(), "Trainers");
        }
    }
}
