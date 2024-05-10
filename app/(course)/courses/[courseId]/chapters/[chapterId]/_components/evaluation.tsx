"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Star, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { EvaluationTags } from "./evaluation-tags";

interface EvaluationProps {
  courseId: string;
  chapterId: string;
}

type Rating = 0 | 1 | 2 | 3 | 4 | 5 extends number ? number : never;

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  tags: z.array(z.string()).min(1),
  comment: z.string().min(1),
});

export const Evaluation = ({ courseId, chapterId }: EvaluationProps) => {
  const [cancel, setCancel] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const [hover, setHover] = useState<Rating>(0);
  const [rating, setRating] = useState<Rating>(0);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      tags: [],
      comment: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await axios.get(
          `/api/courses/${courseId}/chapters/${chapterId}/evaluation`
        );
        const data = response.data;
        if (data) {
          setHasEvaluated(true);
          setRating(data.rating + 1);
        }
      } catch (error) {
        console.error("Error fetching evaluation:", error);
      }
    };

    fetchEvaluation();
  }, [courseId, chapterId]);

  const handleStarClick = (index: Rating) => {
    if (hasEvaluated) {
      return toast.error("You have already rated this chapter!");
    }

    setCancel(true);
    setConfirm(true);
    setRating(index + 1);
    setHover(0);

    form.setValue("rating", index);
  };

  const handleTagClick = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  const handleCloseDialog = () => {
    setSelectedTags([]);

    form.setValue("tags", []);
    form.setValue("comment", "");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (hasEvaluated) {
      return toast.error("You have already rated this chapter!");
    }

    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/evaluation`,
        values
      );

      setHasEvaluated(true);
      toast.success("Evaluation sent! Thank You!");
    } catch {
      toast.error("Something Went Wrong!");
    } finally {
      setCancel(false);
      setConfirm(false);
    }
  };

  const handleMouseOver = (index: Rating) => {
    setHover(index + 1);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className="flex flex-col items-center min-w-[280px] max-w-[280px] rounded border bg-slate-100">
      <div className="relative flex justify-center items-center px-6 py-3 w-full bg-gradient-to-r bg-slate-200">
        <p className="text-sm text-slate-500 ">O que você achou desta aula?</p>
        {cancel && (
          <X
            onClick={() => {
              setCancel(false);
              setConfirm(false);
              setRating(0);
              setHover(0);

              form.setValue("rating", 0);
              form.setValue("tags", []);
              form.setValue("comment", "");
            }}
            className="w-4 h-4 absolute top-3.5 right-4 text-slate-700 text-base cursor-pointer"
          />
        )}
      </div>
      <div className="flex flex-col items-center px-6 py-5 gap-6">
        <div className="flex justify-center items-center">
          {Array.from({ length: 5 }, (_, index) => index + 1).map(
            (index: Rating) => (
              <button
                key={index}
                onClick={() => handleStarClick(index)}
                onMouseOver={() => handleMouseOver(index)}
                onMouseLeave={handleMouseLeave}
                className="text-slate-700 hover:text-yellow-300 [&+&]:pl-2"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    (index < rating || index < hover) &&
                    "text-yellow-300 first:[&>path]:fill-yellow-300"
                  }`}
                />
              </button>
            )
          )}
        </div>
      </div>
      {confirm && (
        <Dialog
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              handleCloseDialog();
            }
          }}
        >
          <DialogTrigger className="relative inline-flex flex-shrink-0 justify-center items-center transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-slate-200 hover:enabled:bg-slate-300 text-slate-500 px-8 py-3 text-2xl w-full rounded-none">
            <div className="flex flex-1 justify-center items-center gap-2">
              <span className="text-base leading-6 font-semibold">
                Confirmar
              </span>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[90vw] md:w-[480px] rounded overflow-hidden">
            <DialogHeader>
              <DialogTitle>Avaliação!</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-center mt-2 gap-6"
                  >
                    <div className="flex flex-col gap-4">
                      <p className="text-slate-500 text-base font-normal">
                        Qual é o motivo da sua avaliação?
                      </p>
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <div className="flex gap-3 flex-wrap self-stretch">
                            {rating - 1 >= 5 ? (
                              <>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Bom Conteúdo"
                                  )}
                                  onClick={() => handleTagClick("Bom Conteúdo")}
                                >
                                  Bom Conteúdo
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Explicação Detalhada"
                                  )}
                                  onClick={() =>
                                    handleTagClick("Explicação Detalhada")
                                  }
                                >
                                  Explicação Detalhada
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Bom Projeto"
                                  )}
                                  onClick={() => handleTagClick("Bom Projeto")}
                                >
                                  Bom Projeto
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Boa Qualidade de Media"
                                  )}
                                  onClick={() =>
                                    handleTagClick("Boa Qualidade de Media")
                                  }
                                >
                                  Boa Qualidade de Media
                                </EvaluationTags>
                                <br />
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Boa Didática"
                                  )}
                                  onClick={() => handleTagClick("Boa Didática")}
                                >
                                  Boa Didática
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes("Outros")}
                                  onClick={() => handleTagClick("Outros")}
                                >
                                  Outros
                                </EvaluationTags>
                              </>
                            ) : (
                              <>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Aula/didática má"
                                  )}
                                  onClick={() =>
                                    handleTagClick("Aula/didática má")
                                  }
                                >
                                  Aula/didática má
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Conteúdo desatualizado"
                                  )}
                                  onClick={() =>
                                    handleTagClick("Conteúdo desatualizado")
                                  }
                                >
                                  Conteúdo desatualizado
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Qualidade má de media"
                                  )}
                                  onClick={() =>
                                    handleTagClick("Qualidade má de media")
                                  }
                                >
                                  Qualidade má de media
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Problema no player"
                                  )}
                                  onClick={() =>
                                    handleTagClick("Problema no player")
                                  }
                                >
                                  Problema no player
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes(
                                    "Material incompleto"
                                  )}
                                  onClick={() =>
                                    handleTagClick("Material incompleto")
                                  }
                                >
                                  Material incompleto
                                </EvaluationTags>
                                <EvaluationTags
                                  isSelected={selectedTags.includes("Outros")}
                                  onClick={() => handleTagClick("Outros")}
                                >
                                  Outros
                                </EvaluationTags>
                              </>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Conte um pouco mais sobre o motivo da sua avaliação. Contribua para o crescimento da plataforma e com a qualidade do conteúdo."
                          className="flex pt-4 px-4 pb-4 w-full h-[112px] rounded border border-transparent bg-slate-100 text-slate-500 text-base transition-colors resize-none placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-sky-600"
                        />
                      )}
                    />
                  </form>
                  <button
                    type="submit"
                    className="relative inline-flex flex-shrink-0 justify-center items-center transition-colors ease-in-out duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-slate-100 hover:enabled:bg-slate-200 text-slate-500 px-8 py-3 mt-4 text-2xl w-full rounded-sm"
                    disabled={!isValid || isSubmitting}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <div className="flex flex-1 justify-center items-center gap-2">
                      <span className="text-base leading-6">Enviar</span>
                    </div>
                  </button>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
