﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using ASM_WEB_APP.Models;

namespace ASM_WEB_APP.Controllers
{
    [Authorize]
    public class CoursesController : Controller
    {
        private AsmWebAppDBEntities db = new AsmWebAppDBEntities();

        // GET: Courses
        public ActionResult Index(string sortOrder, string searchCourse)
        {
            ViewBag.CourseSortParm = String.IsNullOrEmpty(sortOrder) ? "course_desc" : "";

            var courses = from c in db.Courses select c;
            if (!String.IsNullOrEmpty(searchCourse))
            {
                courses = courses.Where(c => c.CourseName.Contains(searchCourse));
            }
            switch (sortOrder)
            {
                case "course_desc":
                    courses = courses.OrderByDescending(c => c.CourseName);
                    break;
                default:
                    courses = courses.OrderBy(c => c.CourseName);
                    break;
            }
            return View(courses);
        }

        // GET: Courses/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                return HttpNotFound();
            }
            ViewBag.CourseTopics = db.CourseTopics.Where(ctp => ctp.CourseID == id);
            if(db.CourseTopics.Where(ctp => ctp.CourseID == id).ToList().Count == db.Topics.ToList().Count)
            {
                ViewBag.IsFull = true;
            }
            else
            {
                ViewBag.IsFull = false;
            }
            return View(course);
        }

        // GET: Courses/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Courses/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "CourseID,CourseName,Description")] Course course)
        {
            if (ModelState.IsValid)
            {
                db.Courses.Add(course);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(course);
        }

        // GET: Courses/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                return HttpNotFound();
            }
            return View(course);
        }

        // POST: Courses/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CourseID,CourseName,Description")] Course course)
        {
            if (ModelState.IsValid)
            {
                db.Entry(course).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(course);
        }

        // GET: Courses/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                return HttpNotFound();
            }
            return View(course);
        }

        // POST: Courses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Course course = db.Courses.Find(id);
            var coursetopics = db.CourseTopics.Where(ctp => ctp.CourseID == id).ToList();
            var enrollments = db.Enrollments.Where(e => e.CourseID == id).ToList();
            foreach(var ctp in coursetopics)
            {
                db.CourseTopics.Remove(ctp);
            }
            foreach(var e in enrollments)
            {
                db.Enrollments.Remove(e);
            }
            db.Courses.Remove(course);
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