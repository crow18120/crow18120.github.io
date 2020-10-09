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
    public class CourseTopicsController : Controller
    {
        private AsmWebAppDBEntities db = new AsmWebAppDBEntities();

        // GET: CourseTopics
        public ActionResult Index()
        {
            var courseTopics = db.CourseTopics.Include(c => c.Course).Include(c => c.Topic).Include(c => c.Trainer);
            return View(courseTopics.ToList());
        }

        // GET: CourseTopics/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CourseTopic courseTopic = db.CourseTopics.Find(id);
            if (courseTopic == null)
            {
                return HttpNotFound();
            }
            return View(courseTopic);
        }

        // GET: CourseTopics/Create
        public ActionResult Create()
        {
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName");
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName");
            ViewBag.TrainerID = new SelectList(db.Trainers, "TrainerID", "LastName");
            return View();
        }

        // POST: CourseTopics/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,CourseID,TopicID,TrainerID")] CourseTopic courseTopic)
        {
            if (ModelState.IsValid)
            {
                db.CourseTopics.Add(courseTopic);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", courseTopic.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", courseTopic.TopicID);
            ViewBag.TrainerID = new SelectList(db.Trainers, "TrainerID", "LastName", courseTopic.TrainerID);
            return View(courseTopic);
        }

        // GET: CourseTopics/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CourseTopic courseTopic = db.CourseTopics.Find(id);
            if (courseTopic == null)
            {
                return HttpNotFound();
            }
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", courseTopic.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", courseTopic.TopicID);
            ViewBag.TrainerID = new SelectList(db.Trainers, "TrainerID", "LastName", courseTopic.TrainerID);
            return View(courseTopic);
        }

        // POST: CourseTopics/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,CourseID,TopicID,TrainerID")] CourseTopic courseTopic)
        {
            if (ModelState.IsValid)
            {
                db.Entry(courseTopic).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", courseTopic.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", courseTopic.TopicID);
            ViewBag.TrainerID = new SelectList(db.Trainers, "TrainerID", "LastName", courseTopic.TrainerID);
            return View(courseTopic);
        }

        // GET: CourseTopics/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CourseTopic courseTopic = db.CourseTopics.Find(id);
            if (courseTopic == null)
            {
                return HttpNotFound();
            }
            return View(courseTopic);
        }

        // POST: CourseTopics/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CourseTopic courseTopic = db.CourseTopics.Find(id);
            db.CourseTopics.Remove(courseTopic);
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
    }
}
