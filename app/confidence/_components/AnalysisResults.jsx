"use client";
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Box,
} from "@mui/material";
import { FaSmile, FaMicrophone, FaLightbulb } from "react-icons/fa";
import { Replay as ReplayIcon } from "@mui/icons-material";

const AnalysisResults = ({ result, onGoBack }) => {
  // Ensure result values are valid before rendering
  const faceConfidence = result?.face_confidence
    ? parseFloat(result.face_confidence)
    : 0;
  const voiceConfidence = result?.voice_confidence
    ? parseFloat(result.voice_confidence)
    : 0;
  const overallConfidence = result?.confidence
    ? parseFloat(result.confidence)
    : 0;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Grid container spacing={3} maxWidth="md">
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            Analysis Results
          </Typography>
        </Grid>

        {/* Face Analysis */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                display="flex"
                alignItems="center"
              >
                <FaSmile style={{ marginRight: "10px", color: "#4caf50" }} />{" "}
                Face Analysis
              </Typography>
              <Typography variant="body1" mt={2}>
                Confidence Level: {faceConfidence}%
              </Typography>
              <LinearProgress variant="determinate" value={faceConfidence} />
            </CardContent>
          </Card>
        </Grid>

        {/* Voice Analysis */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                display="flex"
                alignItems="center"
              >
                <FaMicrophone
                  style={{ marginRight: "10px", color: "#2196f3" }}
                />{" "}
                Voice Analysis
              </Typography>
              <Typography variant="body1" mt={2}>
                Confidence Level: {voiceConfidence}%
              </Typography>
              <LinearProgress variant="determinate" value={voiceConfidence} />
            </CardContent>
          </Card>
        </Grid>

        {/* Overall Confidence */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                display="flex"
                alignItems="center"
              >
                <FaLightbulb
                  style={{ marginRight: "10px", color: "#ff9800" }}
                />{" "}
                Overall Confidence
              </Typography>
              <Typography variant="body1" mt={2}>
                {overallConfidence}%
              </Typography>
              <LinearProgress variant="determinate" value={overallConfidence} />
            </CardContent>
          </Card>
        </Grid>

        {/* Transcribed Text */}
        {result?.transcribed_text && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Transcribed Text:
                </Typography>
                <Typography variant="body1" color="textSecondary" mt={1}>
                  {result.transcribed_text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Suggestions for Improvement */}
        {result?.suggestions?.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Suggestions for Improvement:
                </Typography>
                <ul>
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <FaLightbulb
                        style={{ marginRight: "10px", color: "#ffc107" }}
                      />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Retry Button */}
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ReplayIcon />}
            onClick={onGoBack}
          >
            Analyze Another Video
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisResults;
