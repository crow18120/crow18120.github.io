using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ASM_WEB_APP.Models;

namespace ASM_WEB_APP.Controllers
{
    [Authorize]
    public class TraineesController : Controller
    {
        private AsmWebAppDBEntities db = new AsmWebAppDBEntities();

        // GET: Trainees
        public ActionResult Index(string sortOrder, string SearchTrainee)
        {
            ViewBag.TraineeSortParm = String.IsNullOrEmpty(sortOrder) ? "trainee_desc" : "";

            var trainees = from s in db.Trainees select s;
            if (!String.IsNullOrEmpty(SearchTrainee))
            {
                trainees = trainees.Where(s => (s.LastName + " " + s.FirstName).Contains(SearchTrainee));
            }

            switch (sortOrder)
            {
                case "trainee_desc":
                    trainees = trainees.OrderByDescending(s => s.FirstName);
                    break;
                default:
                    trainees = trainees.OrderBy(s => s.FirstName);
                    break;
            }
            return View(trainees);
        }

        // GET: Trainees/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                foreach (var item in db.Trainees.ToList())
                {
                    if (item.UserName == User.Identity.Name)
                    {
                        id = item.TraineeID;
                    }
                }
            }
            Trainee trainee = db.Trainees.Find(id);
            if (trainee == null)
            {
                return HttpNotFound();
            }

            var ctpsDB = from ctp in db.CourseTopics
                         join e in db.Enrollments.Where(e => e.TraineeID == id)
on new { ctp.CourseID, ctp.TopicID } equals new { e.CourseID, e.TopicID }
                         select new {
                             CourseName = ctp.Course.CourseName,
                             TopicName = ctp.Topic.TopicName,
                             TrainerName = ctp.Trainer.LastName + " " + ctp.Trainer.FirstName,
                             Grade = e.Grade,
                             ID = e.ID
                         };
            var info = new List<ExpandoObject>();
            foreach(var ctp in ctpsDB)
            {
                dynamic e = new ExpandoObject();
                e.CourseName = ctp.CourseName;
                e.TopicName = ctp.TopicName;
                e.TrainerName = ctp.TrainerName;
                e.Grade = ctp.Grade;
                e.ID = ctp.ID;
                info.Add(e);
            }
            ViewBag.Info = info.ToList();
            return View(trainee);
        }

        // GET: Trainees/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Trainees/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "TraineeID,LastName,FirstName,UserName,Address")] Trainee trainee)
        {
            if (ModelState.IsValid)
            {
                db.Trainees.Add(trainee);
                db.SaveChanges();

                AuthenController.CreateAccount(trainee.UserName, "123456", "Trainee");
                return RedirectToAction("Index");
            }

            return View(trainee);
        }

        // GET: Trainees/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Trainee trainee = db.Trainees.Find(id);
            if (trainee == null)
            {
                return HttpNotFound();
            }
            return View(trainee);
        }

        // POST: Trainees/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "TraineeID,LastName,FirstName,UserName,Address")] Trainee trainee)
        {
            if (ModelState.IsValid)
            {
                db.Entry(trainee).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Details/" + trainee.TraineeID.ToString(), "Trainees");
            }
            return View(trainee);
        }

        // GET: Trainees/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Trainee trainee = db.Trainees.Find(id);
            if (trainee == null)
            {
                return HttpNotFound();
            }
            return View(trainee);
        }

        // POST: Trainees/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Trainee trainee = db.Trainees.Find(id);
            var enrollments = db.Enrollments.Where(e => e.TraineeID == id).ToList();

            foreach (var e in enrollments)
            {
                db.Enrollments.Remove(e);
            }
            AuthenController.DeleteAccount(trainee.UserName);
            db.Trainees.Remove(trainee);
            db.SaveChanges();
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
            Trainee trainee = db.Trainees.Find(id);
            if (trainee == null)
            {
                return HttpNotFound();
            }
            return View(trainee);
        }

        [HttpPost]
        public ActionResult ChangePassword(int traineeID, string userName, string currentPassword, string newPassword)
        {
            if (!AuthenController.ChangePassword(userName, currentPassword, newPassword).Succeeded)
            {
                ModelState.AddModelError("", "Can't change password. Something's wrong.");
                Trainee trainee = db.Trainees.Find(traineeID);
                return View(trainee);
            }
            return RedirectToAction("Details/" + traineeID.ToString(), "Trainees");
        }
    }
}
