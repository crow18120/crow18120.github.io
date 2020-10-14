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
    public class CourseTopicsController : Controller
    {
        private AsmWebAppDBEntities db = new AsmWebAppDBEntities();

        // GET: CourseTopics
        public ActionResult Index(string sortOrder, string searchCourse, string searchTopic, string searchTrainer)
        {
            ViewBag.CourseSortParm = String.IsNullOrEmpty(sortOrder) ? "course_desc" : "";
            ViewBag.TopicSortParm = sortOrder == "Topic" ? "topic_desc" : "Topic";
            ViewBag.TrainerSortParm = sortOrder == "Trainer" ? "trainer_desc" : "Trainer";

            var courseTopics = from ctp in db.CourseTopics select ctp;

            if (!String.IsNullOrEmpty(searchCourse))
            {
                courseTopics = courseTopics.Where(ctp => ctp.Course.CourseName.Contains(searchCourse));
            }

            if (!String.IsNullOrEmpty(searchTopic))
            {
                courseTopics = courseTopics.Where(ctp => ctp.Topic.TopicName.Contains(searchTopic));
            }

            if (!String.IsNullOrEmpty(searchTrainer))
            {
                courseTopics = courseTopics.Where(ctp => (ctp.Trainer.LastName + " " + ctp.Trainer.FirstName).Contains(searchTrainer) || ctp.Trainer.LastName.Contains(searchTrainer) || ctp.Trainer.FirstName.Contains(searchTrainer));
            }

            switch (sortOrder)
            {
                case "course_desc":
                    courseTopics = courseTopics.OrderByDescending(ctp => ctp.Course.CourseName);
                    break;
                case "topic_desc":
                    courseTopics = courseTopics.OrderByDescending(ctp => ctp.Topic.TopicName);
                    break;
                case "trainer_desc":
                    courseTopics = courseTopics.OrderByDescending(ctp => ctp.Trainer.FirstName);
                    break;
                case "Topic":
                    courseTopics = courseTopics.OrderBy(ctp => ctp.Topic.TopicName);
                    break;
                case "Trainer":
                    courseTopics = courseTopics.OrderBy(ctp => ctp.Trainer.FirstName);
                    break;
                default:
                    courseTopics = courseTopics.OrderBy(ctp => ctp.Course.CourseName);
                    break;
            }
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
            var enrollments = db.Enrollments.ToList();
            var viewBag = new List<Enrollment>(); 
            foreach(var e in enrollments)
            {
                if(e.CourseID == courseTopic.CourseID && e.TopicID == courseTopic.TopicID)
                {
                    viewBag.Add(e); 
                }
            }
            ViewBag.Enrollments = viewBag;
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
