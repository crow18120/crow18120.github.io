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
        public ActionResult Assigned(int? id) {
            foreach (var item in db.Trainers.ToList())
            {
                if (User.Identity.Name==item.UserName)
                {
                    id = item.TrainerID;
                }
            }
            var courseTopic = db.CourseTopics.Where(x => x.TrainerID == id);
            return View(courseTopic);
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
            if(viewBag.Count == db.Trainees.ToList().Count)
            {
                ViewBag.IsFull = true;
            }
            else
            {
                ViewBag.IsFull = false;
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

            var trainers = from t in db.Trainers
                           select new
                           {
                               Trainer = t,
                               TrainerID = t.TrainerID,
                               FullName = t.LastName + " " + t.FirstName
                           };
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", courseTopic.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", courseTopic.TopicID);
            ViewBag.TrainerID = new SelectList(trainers.ToList(), "TrainerID", "FullName", courseTopic.TrainerID);
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
                return RedirectToAction("Details/" + courseTopic.ID.ToString(), "CourseTopics");
            }
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", courseTopic.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", courseTopic.TopicID);
            ViewBag.TrainerID = new SelectList(db.Trainers, "TrainerID", "LastName", courseTopic.TrainerID);
            return View(courseTopic);
        }

        // GET: CourseTopics/Delete/5
        public ActionResult Delete(int? id, string con, string act)
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
            ViewBag.Controller = con;
            ViewBag.Action = act;
            return View(courseTopic);
        }

        // POST: CourseTopics/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id, string con, string act)
        {
            CourseTopic courseTopic = db.CourseTopics.Find(id);
            foreach(var e in db.Enrollments.ToList())
            {
                if(e.TopicID == courseTopic.TopicID && e.CourseID == courseTopic.CourseID)
                {
                    db.Enrollments.Remove(e);
                }
            }
            db.CourseTopics.Remove(courseTopic);
            db.SaveChanges();
            return RedirectToAction(act, con);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public ActionResult AddSession(int trainerID)
        {
            var courses = db.Courses.ToList();
            var topics = db.Topics.ToList();

            ViewBag.CourseID = new SelectList(courses, "CourseID", "CourseName");
            ViewBag.TopicID = new SelectList(topics, "TopicID", "TopicName");

            var trainers = from t in db.Trainers.Where(x => x.TrainerID == trainerID)
                             select new
                             {
                                 Trainer = t,
                                 TrainerID = t.TrainerID,
                                 FullName = t.LastName + " " + t.FirstName
                             };
            ViewBag.TrainerID = new SelectList(trainers.ToList(), "TrainerID", "FullName");
            ViewBag.IsError = false;
            ViewBag.ID = trainerID;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddSession([Bind(Include = "ID,CourseID,TopicID,TrainerID")] CourseTopic courseTopic)
        {
            
            foreach(var ctp in db.CourseTopics.ToList())
            {
                if(ctp.CourseID == courseTopic.CourseID && ctp.TopicID == courseTopic.TopicID && ctp.TrainerID == courseTopic.TrainerID)
                {
                    ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", courseTopic.CourseID);
                    ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", courseTopic.TopicID);
                    var trainers = from t in db.Trainers.Where(x => x.TrainerID == courseTopic.TrainerID)
                                   select new
                                   {
                                       Trainer = t,
                                       TrainerID = t.TrainerID,
                                       FullName = t.LastName + " " + t.FirstName
                                   };
                    ViewBag.TrainerID = new SelectList(trainers.ToList(), "TrainerID", "FullName", courseTopic.TrainerID);
                    ViewBag.IsError = true;
                    ViewBag.ID = courseTopic.TrainerID;
                    return View(courseTopic);
                }
            }
            db.CourseTopics.Add(courseTopic);
            db.SaveChanges();

            return RedirectToAction("Details/" + courseTopic.TrainerID.ToString(), "Trainers"); 
        }

        public ActionResult AddTopic(int courseID)
        {
            var courses = db.Courses.Where(c => c.CourseID == courseID).ToList();
            var topics = db.Topics.ToList();

            ViewBag.CourseID = new SelectList(courses, "CourseID", "CourseName");
            ViewBag.TopicID = new SelectList(topics, "TopicID", "TopicName");

            var trainers = from t in db.Trainers
                           select new
                           {
                               Trainee = t,
                               TrainerID = t.TrainerID,
                               FullName = t.LastName + " " + t.FirstName
                           };
            ViewBag.TrainerID = new SelectList(trainers.ToList(), "TrainerID", "FullName");
            ViewBag.IsError = false;
            ViewBag.ID = courseID;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddTopic([Bind(Include = "ID,CourseID,TopicID,TrainerID")] CourseTopic courseTopic)
        {

            foreach (var ctp in db.CourseTopics.ToList())
            {
                if (ctp.CourseID == courseTopic.CourseID && ctp.TopicID == courseTopic.TopicID && ctp.TrainerID == courseTopic.TrainerID)
                {
                    ViewBag.CourseID = new SelectList(db.Courses.Where(c => c.CourseID == courseTopic.CourseID), "CourseID", "CourseName", courseTopic.CourseID);
                    ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", courseTopic.TopicID);
                    var trainers = from t in db.Trainers
                                   select new
                                   {
                                       Trainee = t,
                                       TrainerID = t.TrainerID,
                                       FullName = t.LastName + " " + t.FirstName
                                   };
                    ViewBag.TrainerID = new SelectList(trainers.ToList(), "TrainerID", "FullName", courseTopic.TrainerID);
                    ViewBag.ID = courseTopic.CourseID;
                    ViewBag.IsError = true;
                    return View(courseTopic);
                }
            }
            db.CourseTopics.Add(courseTopic);
            db.SaveChanges();

            return RedirectToAction("Details/" + courseTopic.CourseID.ToString(), "Courses");
        }
    }
}
