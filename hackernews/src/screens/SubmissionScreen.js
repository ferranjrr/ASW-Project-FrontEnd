import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import logo from "../assets/gif/y18.gif";
import "../css/news.css";

function Submission() {
    

    

    return (    
        <body>
            <center>
                <table id="hnmain"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="85%"
                    bgcolor="#f6f6ef">
                    <tr>
                        <td bgcolor="#ff6600">
                            <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                style="padding: 2px">
                                <tr>
                                    <td style="width: 18px; padding-right: 4px">
                                        <a href="../"
                                            ><img
                                                src="/static/gif/y18.gif"
                                                width="18"
                                                height="18"
                                                style="border: 1px white solid"
                                        /></a>
                                    </td>
                                    <td style="line-height: 12pt; height: 10px">
                                        <span class="pagetop">
                                            <b class="hnname"><a href="{% url 'news' %}">Hacker News</a></b>
                                            <a href="{% url 'newest' %}">new</a> |
                                            {% if request.user.is_authenticated %}
                                            <a href="{% url 'threads' request.user.username %}">threads</a> |
                                            {% endif %}
                                            {% yesterday as the_time %}
                                            <a href="{% url 'newsDate' the_time %}">past</a> |
                                            <a href="{% url 'ask' %}">ask</a> |
                                            <a href="{% url 'submit' %}">submit</a>
                                        </span>
                                    <td style="text-align: right; padding-right: 4px">
                                        <span class="pagetop">
                                            {% if request.user.is_authenticated %}
                                                <a id="me" href="{% url 'user' request.user.username %}">{{request.user.username}}</a>
                                                <span id="karma">({{request.user.user.karma}})</span> |
                                                <a id="logout" href="{% url 'logout' %}">logout</a>
                                            {% else %}
                                                <a href="{% url 'login' %}">login</a>
                                            {% endif %}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr id="pagespace" title="" style="height:10px"></tr>
                    <tr>
                        <td>
                            {% if submission %}
                            <table class="fatitem" border="0">
                                <tbody>
                                <tr class="athing" id="31026659">
                                    <td class="title" valign="top" align="right">
                                        <span class="rank"></span>
                                    </td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_31026659" class="clicky" href="vote?id=31026659&amp;how=up&amp;goto=item%3Fid%3D31026659">
                                                <div class="votearrow" title="upvote"></div>
                                            </a>
                                        </center>
                                    </td>
                                    {% if "url" == submission.type %}
                                    <td class="title">
                                        <a href="{{ submission.url }}"
                                        class="titlelink">
                                            {{ submission.title }}
                                        </a>
                                        <span class="sitebit comhead">
                                            (<a href="{{ submission.url }}">
                                            <span class="sitestr">{{ submission.url_domain }}
                                            </span>
                                            </a>)
                                        </span>
                                    </td>
                                    {% else %}
                                    <td class="title">
                                        <a href="{% url 'detailedSubmission' submission.id %}"
                                        class="titlelink">
                                            {{ submission.title }}
                                        </a>
                                    </td>
                                    {% endif %}
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_30784939">{{ submission.upvotes.count }} points </span> by
                                        <a href="{% url 'user' submission.author %}">{{ submission.author }}</a>
                                        <span class="age">
                                            <a href="{% url 'detailedSubmission' submission.id %}">{{ submission.age }}</a>
                                        </span>|
                                        <a href="hide?id=30784939&amp;goto=news">hide</a>|
                                        <a href="{% url 'detailedSubmission' submission.id %}">{{ submission.comment_set.count }}&nbsp;comments</a>
                                    </td>
                                </tr>
                                <tr style="height:2px"></tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td>{{submission.text}}
                                        <p></p>
                                    </td>
                                </tr>
                                <tr style="height:10px"></tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td>
                                        <form method="post" action="{% url 'detailedSubmission' submission.id %}">
                                            {% csrf_token %}
                                            <input type="hidden" name="submission" value="{{submission.id}}">
                                            <input type="hidden" name="parent" value="{{submission.id}}">
                                            <textarea name="text" rows="8" cols="80"></textarea>
                                            <br>
                                            <br>
                                            <input type="submit" value="submitComment"></form>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            {% else %}
                            <p>No submissions available.</p>
                            {% endif %}
                            <br>
                            <br>
                            <table border="0">
                                {% if comments_list %}
                                {% include "comment.html" with idx=0 %}
                                {% else %}
                                <p>No comments available.</p>
                                {% endif %}
                            <table border="0">
                        </td>
                    </tr>
                </table>
            </center>
        </body>
    );
}

export default Submission;